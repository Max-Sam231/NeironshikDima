import {
	Body,
	Controller,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtGuard } from 'src/auth/jwt.guard'
import { GetUserId } from 'src/decorators/get-user-id.decorator'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@UseGuards(JwtGuard)
	@Post('text')
	async text(@GetUserId() id: number, @Body() text: { text: string }) {
		const response = await this.chatService.textRequest(id, text.text)
		return response
	}

	@UseGuards(JwtGuard)
	@Post('image')
	@UseInterceptors(FileInterceptor('image'))
	async image(
		@GetUserId() id: number,
		@UploadedFile() file: Express.Multer.File,
		@Body() prompt
	) {
		const response = await this.chatService.imageRequest(id, file, prompt)
		return response
	}
}
