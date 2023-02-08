import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
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
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy],
})
export class UserModule {}
