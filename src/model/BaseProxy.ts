import { Proxy } from '@candywings/pure-mvc';
import { computed, IReactionPublic } from 'mobx';
import ReactionUtil from '../utils/ReactionUtil';

export class BaseProxy<M> extends Proxy<M> {
  protected baseProxyUtil: ReactionUtil;
  public initializeNotifier(key: string): void {
    super.initializeNotifier(key);
    this.baseProxyUtil = new ReactionUtil(this);
  }

  @computed
  get vo(): M {
    // @ts-ignore
    return this.data;
  }

  protected addNotificationSenderReactions(): void {
    //
  }

  protected addNotificationSenderReaction<D>(
    expression: (r: IReactionPublic) => D,
    notificationName: string,
    ...args: any[]
  ): this {
    this.baseProxyUtil.addReaction(
      expression,
      this.sendReactionNotification.bind(notificationName, ...args),
      {
        fireImmediately: true,
      },
    );
    return this;
  }

  protected removeNotificationSenderReaction<D>(
    notificationName: string,
    ...args: any[]
  ): this {
    this.baseProxyUtil.removeReaction(
      this.sendReactionNotification.bind(notificationName, ...args),
    );
    return this;
  }

  protected sendReactionNotification = (
    notificationName: string,
    ...args: any[]
  ) => {
    this.sendNotification(notificationName, ...args);
  };
}
