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

  private async stickerForReply(command) {
    switch (command) {
      case CommandsNames.red:
        return StickersEnum.red;
      case CommandsNames.yellow:
        return StickersEnum.yellow;
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
        'Внимание! Ваш чат теперь под строгим надзором HumorJudgeBot! Шутите с осторожностью',
      );
    }
  }

  public async cardCommands(ctx) {
    if (!ctx.message.reply_to_message) {
      return await ctx.reply('Шо, а кто сказал эту мерзость?');
    }

    const isBot = await this.botReplyProtector(ctx);

    if (!isBot) {
      const participant = {
        id: ctx.message.reply_to_message.from.id,
        name: `${ctx.message.reply_to_message.from.first_name} ${ctx.message.reply_to_message.from.last_name}`,
      };

      await this.groupService.updateParticipants(
        ctx.message.chat.title,
        participant,
        ctx.command,
      );

      const message = this.messageService.getMessage(ctx.command);

      await ctx.reply(message, {
        reply_to_message_id: ctx.message.reply_to_message.message_id,
      });
      const sticker = await this.stickerForReply(ctx.command);
      await ctx.replyWithSticker(sticker);
    }
  }

  public async stats(ctx) {
    const participants = await this.groupService.getAllGroupParticipants(
      ctx.message.chat.title,
    );

    if (participants.length > 0) {
      let stringParticipants = '';

      participants.forEach((item) => {
        stringParticipants += `${item.name}: yellow - ${item.yellowCard}, red - ${item.redCard} \n`;
      });

      ctx.reply(`
      А вот и все шутники: \n${stringParticipants}
      `);
    } else {
      ctx.reply('Вы молодцы, плохих шутников не найдено!');
    }
  }
}
