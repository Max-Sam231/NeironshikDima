import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class AuthDto {
	@IsEmail()
	@ApiProperty({ example: 'test@test.test' })
	email: string

	@IsString()
	@ApiProperty({ example: 'secretpassword' })
	password: string

	@IsOptional()
	@IsString()
	weight: string

	@IsOptional()
	@IsString()
	height: string

	@IsOptional()
	@IsNumber()
	age: number

	@IsOptional()
	@IsArray()
	allergy: string[]
}
