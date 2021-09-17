import { Injectable } from '@nestjs/common';
import { ActionEmitterService } from '../action-emitter/action-emitter.service';
import { CommandsNames } from './enums/comands.enum';
import { StickersEnum } from '../bot/enums/stickers.enum';
import { MessagesService } from '../messages/messages.service';
import { GroupService } from '../database/group/group.service';
import { GroupDto } from '../database/group/group.dto';

interface ICommandMapping {
  command: CommandsNames;
  action: (any) => void;
}
type CommandsMapType = ICommandMapping[];

@Injectable()
export class CommandsService {
  private commandsMapping: CommandsMapType;

  constructor(
    private actionEmitter: ActionEmitterService,
    private messageService: MessagesService,
    private groupService: GroupService,
  ) {
    this.commandsMapping = [
      { command: CommandsNames.start, action: this.start.bind(this) },
      {
        command: CommandsNames.yellow,
        action: this.cardCommands.bind(this),
      },
      {
        command: CommandsNames.red,
        action: this.cardCommands.bind(this),
      },
      { command: CommandsNames.stats, action: this.stats.bind(this) },
    ];

    this.handleSubscribeActions();
  }

  private handleSubscribeActions() {
    this.commandsMapping.forEach((commandLink) => {
      this.actionEmitter.subscribe(commandLink.command, commandLink.action);
    });
  }

  private async botReplyProtector(ctx) {
    const { first_name } = ctx.message.reply_to_message.from;

    if (
      first_name.includes('Bot') ||
      first_name.includes('_Bot') ||
      first_name.includes('_bot')
    ) {
      await ctx.reply('Своих не осуждаем');
      return true;
    }
  }

  public async start(ctx) {
    const GroupDto: GroupDto = {
      name: ctx.message.chat.title,
    };

    const group = await this.groupService.createGroup(GroupDto);

    console.log(group);

    if (!group) {
      ctx.reply('Эй, да уже давно все есть, че ты стартуешь?');
    } else {
      ctx.reply(
        'Внимание! Ваш чат теперь под строгим надзором HumorJudgeBot! Шутите с осторожность.',
      );
    }
  }

  public async cardCommands(ctx) {
    console.log(ctx);
    if (!ctx.message.reply_to_message) {
      return await ctx.reply('Шо, а кто сказал эту мерзость?');
    }

    const isBot = await this.botReplyProtector(ctx);

    if (!isBot) {
      const message = this.messageService.getMessage(ctx.command);

      await ctx.reply(message, {
        reply_to_message_id: ctx.message.reply_to_message.message_id,
      });
      await ctx.replyWithSticker(StickersEnum.yellow);
    }
  }

  public stats(ctx) {
    ctx.reply('А вот и все шутники:');
  }
}
