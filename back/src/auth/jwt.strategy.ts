import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from 'src/auth/auth.service'
import { IJwtPayload } from './types/jwt-payload.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET as string
		})
	}

	async validate(payload: IJwtPayload & { email: string }) {
		return { id: payload.id, email: payload.email }
	}
}
