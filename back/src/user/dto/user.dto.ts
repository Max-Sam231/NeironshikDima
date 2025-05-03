import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

export class UserDto {
	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1 })
	id: number

	@IsOptional()
	@IsEmail()
	@ApiProperty({ example: 'test@test.test' })
	email: string

	@IsOptional()
	@IsString()
	@ApiProperty({
		example: 'secretpassword'
	})
	password: string

	@IsOptional()
	@IsString()
	weight: string
	
	@IsOptional()
	@IsString()
	height: string
	
	@IsOptional()
	@IsArray()
	allergy: string[]
}
