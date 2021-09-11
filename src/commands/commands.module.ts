import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { ActionEmitterModule } from '../action-emitter/action-emitter.module';
import { MessagesModule } from '../messages/messages.module';
import { GroupService } from '../database/group/group.service';

@Module({
  imports: [ActionEmitterModule, MessagesModule, GroupService],
  providers: [CommandsService],
})
export class CommandsModule {}
