import { Mediator } from '@candywings/pure-mvc';
import { IReactionOptions, IReactionPublic } from 'mobx';
import ReactionUtil from '../../utils/ReactionUtil';

export abstract class BaseMediator<T> extends Mediator<T> {
  protected baseMediatorsUtil: ReactionUtil;
  public initializeNotifier(key: string): void {
    super.initializeNotifier(key);
    this.baseMediatorsUtil = new ReactionUtil(this);
  }

  public onRegister(): void {
    super.onRegister();
  }

  protected addReactions(): void {
    //
  }

  protected addReaction<D>(
    expression: (r: IReactionPublic) => D,
    effect: (arg: D, r: IReactionPublic) => void,
    opts?: IReactionOptions,
  ): this {
    this.baseMediatorsUtil.addReaction(expression, effect, opts);
    return this;
  }

  protected removeReaction<D>(
    effect: (arg: D, r: IReactionPublic) => void,
  ): this {
    this.baseMediatorsUtil.removeReaction(effect);
    return this;
  }
}
