import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/prisma.service'
import { AuthResponseDto } from './dto/auth-response.dto'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private prisma: PrismaService
	) {}

	async register(dto: AuthDto): Promise<AuthResponseDto> {
		const salt = await bcrypt.genSalt()
		const hashedPassword = await bcrypt.hash(dto.password, salt)

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				passwordHash: hashedPassword,
				weight: dto.weight,
				height: dto.height,
				age: dto.age,
				allergy: dto.allergy
			},
			omit: { passwordHash: true }
		})

		return {
			id: user.id,
			email: user.email,
			token: this.jwtService.sign({ id: user.id })
		}
	}

	async login(dto: AuthDto): Promise<AuthResponseDto> {
		const { email, password } = dto

		const user = await this.prisma.user.findUnique({
			where: { email }
		})

		if (!user) {
			throw new BadRequestException('Неверный логин или пароль.')
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			user.passwordHash
		)
		if (!isPasswordValid) {
			throw new BadRequestException('Неверный логин или пароль.')
		}

		return {
			id: user.id,
			email: user.email,
			token: this.jwtService.sign({ id: user.id })
		}
	}

	async findOne(data: Prisma.UserWhereUniqueInput) {
		const user = await this.prisma.user.findUnique({
			where: data,
			omit: { passwordHash: true }
		})

		return user
	}

	async update(
		where: Prisma.UserWhereUniqueInput,
		data: Prisma.UserUpdateInput
	) {
		return await this.prisma.user.update({ where, data })
	}
}
