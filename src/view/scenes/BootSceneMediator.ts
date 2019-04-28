import GameFacade from '../../GameFacade';
import BaseSceneMediator from './BaseSceneMediator';
import BootScene from './BootScene';

export default class BootSceneMediator extends BaseSceneMediator<BootScene> {
  public static NAME: string = 'BootSceneMediator';

  constructor() {
    super(BootSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(GameFacade.STARTUP);
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case GameFacade.STARTUP:
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  protected onSceneDestroy(): void {
    super.onSceneDestroy();
    this.facade.removeMediator(BootSceneMediator.NAME, this.id);
  }

  protected setView(): void {
    const bootScene: BootScene = new BootScene();
    this.sceneManager.add(BootScene.NAME, bootScene);
    this.setViewComponent(bootScene);
    this.sceneManager.start(BootScene.NAME);
    super.setView();
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      BootScene.LOAD_COMPLETE_EVENT,
      this.onLoadComplete,
      this,
    );
  }

  private async onLoadComplete(): Promise<void> {
    this.facade.sendNotification(BootScene.LOAD_COMPLETE_NOTIFICATION);
    this.sceneManager.stop(BootScene.NAME);
  }
}
