import { Module } from '@nestjs/common';
import { NIDController } from './nid.controller';
import { NIDService } from './nid.service';

@Module({
  controllers: [NIDController],
  providers: [NIDService],
})
export class NIDModule {}
