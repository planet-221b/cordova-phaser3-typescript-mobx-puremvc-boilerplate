import PlayerVOProxy from '../../model/PlayerVOProxy';
import BaseSceneMediator from './BaseSceneMediator';
import GameScene from './GameScene';
import PreloadScene from './PreloadScene';

export default class GameSceneMediator extends BaseSceneMediator<GameScene> {
  public static NAME: string = 'GameSceneMediator';

  constructor() {
    super(GameSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      PreloadScene.LOAD_COMPLETE_NOTIFICATION,
      PlayerVOProxy.LANGUAGE_CHANGED_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case PreloadScene.LOAD_COMPLETE_NOTIFICATION:
        this.game.scene.start(GameScene.NAME);
        break;
      case PlayerVOProxy.LANGUAGE_CHANGED_NOTIFICATION:
        this.updateLanguage();
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  protected setView(): void {
    const gameScene: GameScene = new GameScene();
    this.sceneManager.add(GameScene.NAME, gameScene);
    this.setViewComponent(gameScene);
    super.setView();
  }

  protected setViewComponentListeners(): void {
    //
  }

  get playerVOProxy(): PlayerVOProxy {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME);
  }
}
