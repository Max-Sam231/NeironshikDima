import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
import { IJwtPayload } from 'src/auth/types/jwt-payload.type'

export const GetUserId = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): string => {
		const request = ctx.switchToHttp().getRequest<Request>()

		if (!request.user) {
			throw new UnauthorizedException('Пользователь не авторизован.')
		}

		return (request.user as IJwtPayload).id
	}
)
