import { Module } from '@nestjs/common'
import { AIService } from 'src/ai.service'
import { PrismaService } from 'src/prisma.service'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
	controllers: [ChatController],
	providers: [ChatService, PrismaService, AIService]
})
export class ChatModule {}
