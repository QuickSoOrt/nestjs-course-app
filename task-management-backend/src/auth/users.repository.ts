import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { SignUpDto } from "./dto/sign-up.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User>
{
	public async CreateUser(createUserDto: SignUpDto): Promise<void>
	{
		try
		{
			const { username, password } = createUserDto;

			const salt = await bcrypt.genSalt();

			const hashedPassword = await bcrypt.hash(password, salt);

			const newUser = this.create
			({
				username,
				password: hashedPassword,
			});

			await this.save(newUser);
		}
		catch (error)
		{
			switch (error.code)
			{
				case "23505":
					throw new ConflictException('Username already exists');
					break;
				default:
					throw new InternalServerErrorException();
			}
		}
	}
}