import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { ProxyAgent, setGlobalDispatcher } from 'undici'

@Injectable()
export class AIService {
	private readonly client: OpenAI

	constructor() {
		const proxyUrl = 'http://9WAvr2:GrqDBh@45.92.20.119:8000'
		const dispatcher = new ProxyAgent(proxyUrl)
		setGlobalDispatcher(dispatcher)

		this.client = new OpenAI({
			baseURL: 'https://openrouter.ai/api/v1',
			apiKey: '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',
			dangerouslyAllowBrowser: true,
			maxRetries: 2
		})
	}

	async generateText(allergies, prompt: string, instruction): Promise<any> {
		try {
			const completion = await this.client.chat.completions.create({
				model: 'meta-llama/llama-4-scout',
				messages: [
					{ role: 'system', content: instruction },
					{
						role: 'user',
						content: `Мои аллергены: ${allergies}\nПроблема: ${prompt}`
					}
				],
				max_tokens: 2000,
				temperature: 1
			})

			return completion.choices[0].message.content || 'Ответа'
		} catch (error) {
			console.error(
				'Error calling OpenRouter through proxy:',
				error.message
			)
			throw new Error('Failed to get response from OpenRouter')
		}
	}

	async checkImage(allergies, file, prompt, instruction): Promise<string> {
		try {
			const base64Image = file.buffer.toString('base64')
			const mimeType = file.mimetype

			const completion = await this.client.chat.completions.create({
				model: 'meta-llama/llama-4-maverick',
				messages: [
					{ role: 'system', content: instruction },
					{
						role: 'user',
						content: [
							{
								type: 'text',
								text: `Мои аллергены: ${allergies?.allergy}\nПроблема: ${prompt.prompt}`
							},
							{
								type: 'image_url',
								image_url: {
									url: `data:${mimeType};base64,${base64Image}`
								}
							}
						]
					}
				],
				max_tokens: 2000,
				temperature: 0.8
			})

			return completion.choices[0].message.content || 'No response'
		} catch (error) {
			console.error(
				'Error calling OpenRouter through proxy:',
				error.message
			)
			throw new Error('Failed to get response from OpenRouter')
		}
	}
}
