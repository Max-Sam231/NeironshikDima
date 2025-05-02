import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'

export class AuthResponseDto {
	@IsNumber()
	@ApiProperty({ example: 1 })
	id: number

	@IsEmail()
	@ApiProperty({ example: 'test@test.test' })
	email: string

	@IsString()
	@ApiProperty()
	token: string
}
