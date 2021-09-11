import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { CommandsNames } from '../commands/enums/comands.enum';
import { ActionEmitterService } from '../action-emitter/action-emitter.service';

@Injectable()
export class BotService {
  private bot: Telegraf<any>;
  constructor(private actionEmitter: ActionEmitterService) {
    this.bot = new Telegraf(process.env.BOT_TOKEN);

    this.mapAvailableCommands().forEach((command) => {
      this.bot.command(command, (ctx) => {
        ctx.command = command;
        this.actionEmitter.emit(command, ctx);
      });
    });
  }

  public launch(): void {
    this.bot.launch();
  }

  private mapAvailableCommands(): string[] {
    return Object.values(CommandsNames);
  }
}
