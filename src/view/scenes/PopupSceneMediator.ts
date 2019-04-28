import StandardPopup from '../popups/StandardPopup';
import PopupManager from '../utils/PopupManager';
import BaseSceneMediator from './BaseSceneMediator';
import PopupScene from './PopupScene';
import PreloadScene from './PreloadScene';

export default class PopupSceneMediator extends BaseSceneMediator<PopupScene> {
  public static NAME: string = 'PopupSceneMediator';
  private popupManager: PopupManager<StandardPopup>;

  constructor(viewComponent?: PopupScene) {
    super(PopupSceneMediator.NAME, viewComponent);
    this.popupManager = PopupManager.instance;
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(PreloadScene.LOAD_COMPLETE_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case PreloadScene.LOAD_COMPLETE_NOTIFICATION:
        this.registerGamePopups();
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  public onSceneReady(): void {
    super.onSceneReady();
  }

  public onSceneWake(): void {
    super.onSceneWake();
    this.game.scene.bringToTop(PopupScene.NAME);
  }

  protected setView(): void {
    const popupScene: PopupScene = new PopupScene();
    this.game.scene.add(PopupScene.NAME, popupScene);
    this.setViewComponent(popupScene);
    this.game.scene.start(PopupScene.NAME);
    this.game.scene.sleep(PopupScene.NAME);
    super.setView();
  }

  protected setViewComponentListeners(): void {
    this.viewComponent.events.on(
      PopupScene.POPUP_PREPARE_TO_SHOW_EVENT,
      this.onPopupShowStart,
      this,
    );
    this.viewComponent.events.on(
      PopupScene.POPUP_SHOW_COMPLETE_EVENT,
      this.onPopupShowComplete,
      this,
    );
    this.viewComponent.events.on(
      PopupScene.POPUP_PREPARE_TO_HIDE_EVENT,
      this.onPopupHideStart,
      this,
    );
    this.viewComponent.events.on(
      PopupScene.POPUP_HIDE_COMPLETE_EVENT,
      this.onPopupHideComplete,
      this,
    );
  }

  private onPopupShowComplete(): void {
    //
  }

  private onPopupHideComplete<T extends StandardPopup>(popup: T): void {
    this.viewComponent.removePopup();
    this.sceneManager.sleep(PopupScene.NAME);
    this.popupManager.popupHideComplete(popup);
  }

  private onPopupShowStart<T extends StandardPopup>(
    popup: T,
    x: number,
    y: number,
    ...args: any[]
  ): void {
    console.warn({ popup, x, y, args });
    this.sceneManager.wake(PopupScene.NAME);
    if (this.popupManager.currentShownPopup === popup) {
      return;
    }

    this.popupManager.show(popup, x, y, ...args);
  }
  private async onPopupHideStart(
    popup: StandardPopup,
    ...args: any[]
  ): Promise<void> {
    await this.popupManager.hide(popup, ...args);
    this.sceneManager.sleep(PopupScene.NAME);
  }

  private registerGamePopups(): void {
    this.sendNotification(PopupScene.REGISTERD_NOTIFICATION);
  }
}
