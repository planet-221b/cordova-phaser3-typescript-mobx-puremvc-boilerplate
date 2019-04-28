import { SimpleCommand, SyncMacroCommand } from '@candywings/pure-mvc';

export default class RegisterGameCommands extends SyncMacroCommand<
  SimpleCommand
> {
  public execute(): void {}
}
