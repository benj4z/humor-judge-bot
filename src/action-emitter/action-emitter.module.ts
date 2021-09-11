import { Module } from '@nestjs/common';
import { ActionEmitterService } from './action-emitter.service';

@Module({
  providers: [ActionEmitterService],
  exports: [ActionEmitterService],
})
export class ActionEmitterModule {}
