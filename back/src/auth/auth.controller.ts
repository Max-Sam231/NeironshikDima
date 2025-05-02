import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Res,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { AuthResponseDto } from './dto/auth-response.dto'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	@ApiOperation({ summary: 'Регистрация нового пользователя' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно зарегистрирован',
		type: AuthResponseDto
	})
	@ApiResponse({
		status: 400,
		description: 'Пользователь с таким email уже существует'
	})
	async register(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: AuthDto
	) {
		const oldUser = await this.authService.findOne({ email: dto.email })
		if (oldUser) {
			throw new BadRequestException(
				'Пользователь с этими данными уже существует.'
			)
		}

		const user = await this.authService.register(dto)
		res.cookie('token', user?.token, {
			httpOnly: true,
			expires: new Date(Date.now() + 86400000),
			sameSite: 'none'
		})

		return user
	}

	@UsePipes(new ValidationPipe())
	@Post('login')
	@ApiOperation({ summary: 'Вход пользователя' })
	@ApiResponse({
		status: 200,
		description: 'Успешный вход',
		type: AuthResponseDto
	})
	@ApiResponse({
		status: 400,
		description: 'Неверный email или пароль'
	})
	async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: AuthDto
	) {
		const user = await this.authService.login(dto)
		res.cookie('token', user?.token, {
			httpOnly: true,
			expires: new Date(Date.now() + 86400000),
			sameSite: 'none'
		})
		return user
	}

	@Get('logout')
	@ApiOperation({ summary: 'Выход пользователя' })
	@ApiResponse({
		status: 200,
		description: 'Успешный выход'
	})
	async logout(@Res({ passthrough: true }) res: Response) {
		res.cookie('token', '', {
			expires: new Date(Date.now()),
			httpOnly: true
		})
		return { success: true }
	}
}
