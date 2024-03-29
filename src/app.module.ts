import { HelperModule } from './helper/helper.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APIResponseModule } from './internal/api-response/api-response.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { NIDModule } from './modules/nid/nid.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    HelperModule,
    AuthModule,
    UserModule,
    APIResponseModule,
    ConfigurationModule,
    NIDModule,
    LoggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
