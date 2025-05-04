import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AIService } from 'src/ai.service'
import { PrismaService } from 'src/prisma.service'
import { imagist } from 'src/prompts/imagist'
import { nutritionist } from 'src/prompts/nutritionist'

@Injectable()
export class ChatService {
	constructor(
		private jwtService: JwtService,
		private prisma: PrismaService,
		private ai: AIService
	) {}

	async textRequest(id, text: string) {
		const allergies = await this.prisma.user.findUnique({
			where: { id },
			select: { allergy: true }
		})
		const message = await this.ai.generateText(
			allergies,
			text,
			nutritionist.instruction
		)
		return message
	}

	async imageRequest(id, file, prompt) {
		const allergies = await this.prisma.user.findUnique({
			where: { id },
			select: { allergy: true }
		})
		const message = await this.ai.checkImage(
			allergies,
			file,
			prompt,
			imagist.instruction
		)
		return message
	}
}
