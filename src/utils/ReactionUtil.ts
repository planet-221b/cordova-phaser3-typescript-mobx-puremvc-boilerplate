import {
  IReactionDisposer,
  IReactionOptions,
  IReactionPublic,
  IWhenOptions,
  reaction,
  when,
} from 'mobx';

export default class ReactionUtil {
  private static readonly consoleArgs: string[] = [
    ``,
    `background: ${'#2A3351'}`,
    `background: ${'#364D98'}`,
    `color: ${'#F4F6FE'}; background: ${'#3656C1'};`,
    `background: ${'#364D98'}`,
    `background: ${'#2A3351'}`,
  ];

  private static disposeReaction<TD>(
    map: Map<(...args: any[]) => void, IReactionDisposer>,
    effect: (arg: TD, r: IReactionPublic) => void,
  ): void {
    if (map.has(effect)) {
      const reactionDisposer: IReactionDisposer = map.get(effect);
      reactionDisposer();
      map.delete(effect);
    }
  }

  protected reactionMap: Map<(...args: any[]) => void, IReactionDisposer>;
  protected whenMap: Map<(...args: any[]) => void, IReactionDisposer>;

  private context: object;

  constructor(context: object) {
    this.context = context;
    this.initialize();
  }

  public initialize(): void {
    this.reactionMap = new Map();
    this.whenMap = new Map();

    ReactionUtil.consoleArgs[0] = `%c %c %c ${
      this.context.constructor.name
    }: initialize %c %c `;
    console.log.apply(console, ReactionUtil.consoleArgs);
  }

  public destroy(): void {
    ReactionUtil.consoleArgs[0] = `%c %c %c ${
      this.context.constructor.name
    }: destroy %c %c `;
    console.log.apply(console, ReactionUtil.consoleArgs);
    this.reactionMap.forEach((reactionDisposer: IReactionDisposer) => {
      reactionDisposer();
    });
    this.reactionMap.clear();
    this.reactionMap = null;
  }

  public addReaction<TD>(
    expression: (r: IReactionPublic) => TD,
    effect: (arg: TD, r: IReactionPublic) => void,
    opts?: IReactionOptions,
  ): this {
    this.reactionMap.set(
      effect,
      reaction(expression, effect.bind(this.context), opts),
    );
    return this;
  }

  public addReactionWhen<TD>(
    predicate: () => boolean,
    expression: (r: IReactionPublic) => TD,
    effect: (arg: TD, r: IReactionPublic) => void,
    reactionOptions?: IReactionOptions,
    whenOptions?: IWhenOptions,
  ): this {
    const whenDisposer: IReactionDisposer = when(
      predicate,
      () => {
        if (this.whenMap.has(effect)) {
          this.whenMap.delete(effect);
        }
        this.reactionMap.set(
          effect,
          reaction(expression, effect.bind(this.context), reactionOptions),
        );
      },
      whenOptions,
    );
    this.whenMap.set(effect, whenDisposer);
    return this;
  }

  public removeReaction<TD>(
    effect: (arg: TD, r: IReactionPublic) => void,
  ): this {
    ReactionUtil.disposeReaction(this.reactionMap, effect);
    ReactionUtil.disposeReaction(this.whenMap, effect);
    return this;
  }
}
