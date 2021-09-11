import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { CommandsModule } from './commands/commands.module';
import { ActionEmitterModule } from './action-emitter/action-emitter.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://judge:${process.env.MONGODB_PASSWORD}@cluster0.cay4d.mongodb.net/humorJudgeChats?retryWrites=true&w=majority`,
    ),
    DatabaseModule,
    BotModule,
    CommandsModule,
    ActionEmitterModule,
    MessagesModule,
  ],
  controllers: [],
})
export class AppModule {}
