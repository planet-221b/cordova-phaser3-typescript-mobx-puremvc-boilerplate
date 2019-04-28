import { BaseProxy } from './BaseProxy';
import GameVO from './vo/GameVO';

export default class GameVOProxy extends BaseProxy<GameVO> {
  public static NAME: string = 'GameVOProxy';
  constructor() {
    super(GameVOProxy.NAME, new GameVO());
  }
}
