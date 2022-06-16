import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Controller('auth')
export class AuthController
{
	private authService: AuthService;

	constructor(authService : AuthService)
	{
		this.authService = authService;
	}

	@Post('/signup')
	public signUp(@Body() signUpDto: SignUpDto): Promise<void>
	{
		return this.authService.signUp(signUpDto);
	}

	@Post('/signin')
	public signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }>
	{
		return this.authService.signIn(signInDto);
	}
}
