import { Module, OnModuleInit } from '@nestjs/common';
import { BotService } from './bot.service';
import { ActionEmitterModule } from '../action-emitter/action-emitter.module';

@Module({
  imports: [ActionEmitterModule],
  providers: [BotService],
})
export class BotModule implements OnModuleInit {
  constructor(private readonly botService: BotService) {}

  async onModuleInit() {
    await this.botService.launch();
  }
}
