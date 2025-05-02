import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('DimaNeironshik Backend')
		.setDescription('Form creator API description')
		.setVersion('1.0')
		.addCookieAuth('token')
		.setExternalDoc('Postman Collection', '/api-json')
		.build()
	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, documentFactory)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true
		})
	)

	app.use(cookieParser())

	app.enableCors({
		origin: 'http://localhost:5173',
		credentials: false,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
	})

	await app.listen(process.env.PORT as string)
}
bootstrap()
