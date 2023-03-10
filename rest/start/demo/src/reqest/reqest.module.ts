import { Module } from '@nestjs/common';
import { ReqestService } from './reqest.service';
import { ReqestController } from './reqest.controller';

@Module({
  controllers: [ReqestController],
  providers: [ReqestService]
})
export class ReqestModule {}
