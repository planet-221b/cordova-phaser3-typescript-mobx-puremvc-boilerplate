import { AsyncMacroCommand, SimpleCommand } from '@candywings/pure-mvc';
import PlayerVOProxy from '../../model/PlayerVOProxy';

export default class PlayerMacroCommand extends AsyncMacroCommand<
  SimpleCommand
> {
  public async execute(
    notificationName?: string,
    ...args: any[]
  ): Promise<void> {
    notificationName;
    args;
    super.execute(notificationName, ...args);
  }

  get proxy(): PlayerVOProxy {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME);
  }
}
