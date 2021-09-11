import { Injectable } from '@nestjs/common';

type MessageType = {
  dangerLevel: string;
  message: string;
};

const MESSAGES: MessageType[] = [
  {
    dangerLevel: 'yellow',
    message: 'Воу, воу, воу, палехче!',
  },
  {
    dangerLevel: 'yellow',
    message: 'А вот за этого Леху то и посадили!',
  },
  {
    dangerLevel: 'yellow',
    message: 'Ты давай, это, хорош...',
  },
  {
    dangerLevel: 'yellow',
    message: 'АСТАНАВИТЭСЬ',
  },
  {
    dangerLevel: 'red',
    message: 'FBI OPEN UP!',
  },
  {
    dangerLevel: 'red',
    message: 'Куда гонишь, брат?',
  },
];

@Injectable()
export class MessagesService {
  private messages = MESSAGES;

  public getMessage(command: string): string {
    const messagesByLevel = this.messages.filter(
      (message) => message.dangerLevel === command,
    );

    const maxRandom = messagesByLevel.length - 1;
    const randomIndex = Math.floor(Math.random() * maxRandom);

    return messagesByLevel[randomIndex].message;
  }
}
