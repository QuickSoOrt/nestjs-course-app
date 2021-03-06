import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { User } from "./user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
	constructor(@InjectRepository(UsersRepository) private userRepository: UsersRepository, private configService: ConfigService)
	{
		super({
			secretOrKey: configService.get('JWT_SECRET'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		});
	}

	async validate(payload: JwtPayload): Promise<User>
	{
		const { username } = payload;

		const user =  await this.userRepository.findOne({ username });

		if (!user)
		{
			throw new UnauthorizedException();
		}

		return user;
	}
}