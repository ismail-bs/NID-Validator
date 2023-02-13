import { HelperModule } from './helper/helper.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APIResponseModule } from './internal/api-response/api-response.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { NIDModule } from './modules/nid/nid.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MiddlewareResponseModule } from './modules/response/response.module';

@Module({
  imports: [
    HelperModule,
    AuthModule,
    UserModule,
    APIResponseModule,
    ConfigurationModule,
    NIDModule,
    MiddlewareResponseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'api/responses', method: RequestMethod.GET })
      .exclude({ path: 'api/auth/admin/create', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
