import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { CommandsModule } from './commands/commands.module';
import { ActionEmitterModule } from './action-emitter/action-emitter.module';
import { MessagesModule } from './messages/messages.module';
import { GroupModule } from './database/group/group.module';
import { ParticipantsModule } from './database/participants/participants/participants.module';
import { ParticipantsModule } from './database/participants/participants.module';
import { ParticipantsModule } from './database/participants/participants/participants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://judge:${process.env.MONGODB_PASSWORD}@cluster0.cay4d.mongodb.net/humorJudgeChats?retryWrites=true&w=majority`,
    ),
    BotModule,
    CommandsModule,
    ActionEmitterModule,
    MessagesModule,
    GroupModule,
    ParticipantsModule,
  ],
  controllers: [],
})
export class AppModule {}
