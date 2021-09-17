import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { ActionEmitterModule } from '../action-emitter/action-emitter.module';
import { MessagesModule } from '../messages/messages.module';
import { GroupModule } from '../database/group/group.module';

@Module({
  imports: [ActionEmitterModule, MessagesModule, GroupModule],
  providers: [CommandsService],
})
export class CommandsModule {}
