import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'src/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt', session: false }),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET as string,
			signOptions: { expiresIn: '1d' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtStrategy],
	exports: [JwtModule, AuthModule]
})
export class AuthModule {}
