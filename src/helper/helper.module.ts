import { Global, Module } from '@nestjs/common';
import { MailService } from './mailService';

@Global()
@Module({
  providers: [MailService],
  exports: [MailService],
})
export class HelperModule {}
