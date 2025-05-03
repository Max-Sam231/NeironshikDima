import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class AuthDto {
	@IsString()
	@ApiProperty({ example: 'test@test.test' })
	email: string

	@IsString()
	name: string

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
	@IsString()
	allergy: string
}
