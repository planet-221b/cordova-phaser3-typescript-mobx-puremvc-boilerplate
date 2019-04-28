import { SimpleCommand } from '@candywings/pure-mvc';

export default class AdCommand extends SimpleCommand {
  public execute(notificationName: string, ...args: any[]): void {
    notificationName;
    args;
  }
}
