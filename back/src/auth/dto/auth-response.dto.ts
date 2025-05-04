import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class AuthResponseDto {
	@IsNumber()
	@ApiProperty({ example: 1 })
	id: number

	@IsString()
	@ApiProperty()
	token: string

	@IsString()
	@ApiProperty({ example: 'test@test.test' })
	email: string

	@IsString()
	name: string

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
