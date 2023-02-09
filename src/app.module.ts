import { HelperModule } from './helper/helper.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APIResponseModule } from './internal/api-response/api-response.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { NIDModule } from './modules/nid/nid.module';

@Module({
  imports: [
    HelperModule,
    AuthModule,
    UserModule,
    APIResponseModule,
    ConfigurationModule,
    NIDModule,
  ],
})
export class AppModule {}
