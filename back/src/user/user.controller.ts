import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Put,
	UseGuards
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/jwt.guard'
import { GetUserId } from 'src/decorators/get-user-id.decorator'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtGuard)
	@Put('update')
	@ApiOperation({ summary: 'Обновление данных пользователя' })
	@ApiResponse({
		status: 200,
		type: UserDto,
		description: 'Данные пользователя успешно обновлены'
	})
	async update(@GetUserId() id: number, @Body() dto: UpdateUserDto) {
		if (dto.email) {
			const isExists = await this.userService.isUserExists(dto.email)
			if (isExists) {
				throw new BadRequestException(
					'Пользователь с этими данными уже существует.'
				)
			}
		}

		const user = await this.userService.update(id, dto)
		return user
	}

	@UseGuards(JwtGuard)
	@Get('me')
	@ApiOperation({ summary: 'Получение данных текущего пользователя' })
	@ApiResponse({
		status: 200,
		type: UserDto,
		description: 'Данные пользователя успешно получены'
	})
	async getMe(@GetUserId() id: number) {
		const user = await this.userService.getMe(id)
		return user
	}

	@UseGuards(JwtGuard)
	@Delete('/')
	@ApiOperation({ summary: 'Удаление пользователя' })
	@ApiResponse({
		status: 200,
		type: UserDto,
		description: 'Пользователь успешно удален'
	})
	async delete(@GetUserId() id: number) {
		const status = await this.userService.delete(id)
		return status
	}
}
