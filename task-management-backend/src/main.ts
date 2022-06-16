import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./transform.interceptor";
import { Logger } from "@nestjs/common";

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule);
	const port = 3000;
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new TransformInterceptor());
	app.enableCors();
	await app.listen(port);
	logger.log(`Application listening on port ${port}`);
}
bootstrap();
