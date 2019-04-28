import BaseSceneMediator from './BaseSceneMediator';
import BootScene from './BootScene';
import PreloadScene from './PreloadScene';

export default class PreloadSceneMediator extends BaseSceneMediator<
  PreloadScene
> {
  public static NAME: string = 'PreloadSceneMediator';

  constructor() {
    super(PreloadSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(BootScene.LOAD_COMPLETE_NOTIFICATION);
  }
  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case BootScene.LOAD_COMPLETE_NOTIFICATION:
        this.sceneManager.start(PreloadScene.NAME);
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  protected onSceneDestroy(): void {
    super.onSceneDestroy();
    this.facade.removeMediator(PreloadSceneMediator.NAME, this.id);
  }

  protected setView(): void {
    const perloadScene: PreloadScene = new PreloadScene();
    this.sceneManager.add(PreloadScene.NAME, perloadScene);
    this.setViewComponent(perloadScene);
    super.setView();
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      PreloadScene.LOAD_COMPLETE_EVENT,
      this.onLoadComplete,
      this,
    );
  }

  private onLoadComplete(): void {
    this.sceneManager.stop(PreloadScene.NAME);
    this.sendNotification(PreloadScene.LOAD_COMPLETE_NOTIFICATION);
  }
}
