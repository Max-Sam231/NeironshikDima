import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserService {
	constructor(
		private jwtService: JwtService,
		private prisma: PrismaService
	) {}

	async update(id: number, dto: UpdateUserDto) {
		const user = await this.prisma.user.update({
			where: { id },
			data: dto,
			omit: { passwordHash: true }
		})

		return user
	}

	async isUserExists(email: string) {
		const user = await this.prisma.user.findUnique({
			where: { email }
		})

		return !!user
	}

	async delete(id: number) {
		await this.prisma.user.delete({ where: { id } })
		return { success: true }
	}

	async getMe(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			omit: { passwordHash: true }
		})
		return user
	}
}
