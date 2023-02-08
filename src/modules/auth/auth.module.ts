import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authConfig } from 'config/auth';
import { JwtStrategy } from 'src/authentication/strategy/jwt-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: authConfig.jwt_key,
      signOptions: {
        expiresIn: authConfig.expiration_time,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
})
export class AuthModule {}
