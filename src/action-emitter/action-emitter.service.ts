import { Injectable } from '@nestjs/common';
import { CommandsNames } from '../commands/enums/comands.enum';

type Listener = (...arg: any[]) => void;
interface IActions {
  [event: string]: Listener[];
}

interface IActionEmitterService {
  subscribe: (commandName: CommandsNames, listener: Listener) => void;
  unsubscribe: (commandName: CommandsNames, listener: Listener) => void;
  emit: (commandName: CommandsNames, args: any) => void;
}

@Injectable()
export class ActionEmitterService implements IActionEmitterService {
  private actions: IActions = {};

  public subscribe(commandName, listener) {
    if (!this.actions[commandName]) {
      this.actions[commandName] = [];
    }

    this.actions[commandName].push(listener);
  }

  public unsubscribe(commandName, listener) {
    if (this.actions[commandName]) {
      this.actions[commandName] = this.actions[commandName].filter(
        (listenerName) => listenerName !== listener,
      );
    }
  }

  public emit(commandName, args) {
    if (!this.actions[commandName]) {
      throw new Error('No subscribers for this command');
    }

    this.actions[commandName].forEach((listener) => {
      return listener.call(null, args);
    });
  }
}
