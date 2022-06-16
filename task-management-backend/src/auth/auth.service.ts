import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";

import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService
{
	constructor(
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
		private jwtService: JwtService
	) {}

	public async signUp(signUpDto: SignUpDto): Promise<void>
	{
		await this.usersRepository.CreateUser(signUpDto);
	}

	public async signIn(signInDto: SignInDto) : Promise<{ accessToken: string }>
	{
		const { username, password } = signInDto;

		const user = await this.usersRepository.findOne({ username });

		if (user)
		{
			if (await bcrypt.compare(password, user.password))
			{
				const payload: JwtPayload = { username };
				const accessToken = this.jwtService.sign(payload);
				return { accessToken };
			}
			else
			{
				throw new UnauthorizedException("Invalid username or password");
			}
		}
		else
		{
			throw new UnauthorizedException("Invalid username or password");
		}
	}
}
