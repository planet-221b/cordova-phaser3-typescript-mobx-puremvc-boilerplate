import GameFacade from '../../GameFacade';
import BaseSceneMediator from './BaseSceneMediator';
import ServiceScene from './ServiceScene';

export default class ServiceSceneMediator extends BaseSceneMediator<
  ServiceScene
> {
  public static NAME: string = 'ServiceSceneMediator';

  constructor() {
    super(ServiceSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(GameFacade.STARTUP);
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case GameFacade.STARTUP:
        this.startScene();
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  protected onSceneDestroy(): void {
    super.onSceneDestroy();
    this.facade.removeMediator(ServiceSceneMediator.NAME, this.id);
  }

  protected setView(): void {
    const serviceScene: ServiceScene = new ServiceScene();
    this.sceneManager.add(ServiceScene.NAME, serviceScene);
    this.setViewComponent(serviceScene);
    super.setView();
  }
}
