import { Optional } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateUserDto {
	@ApiProperty({ example: 'test@test.test' })
	@IsString()
	@Optional()
	email?: string
}
