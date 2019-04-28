import { getScene } from '../../utils/Utils';
import { BaseMediator } from '../base/BaseMediator';
import PopupScene from '../scenes/PopupScene';
import StandardPopup from './StandardPopup';

export default abstract class StandardPopupMediator<
  T extends StandardPopup
> extends BaseMediator<T> {
  constructor(name: string) {
    super(name, null);
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  protected createView(viewComponent?: T): void {
    if (this.viewComponent) {
      this.viewComponent.removeAllListeners();
      this.viewComponent.destroy();
    }
    this.setViewComponent(viewComponent);
    this.setViewComponentListeners();
    this.registerEvents();
  }

  protected showView(x: number, y: number, ...args: any[]): void {
    this.createView();
    this.viewComponent.prepareToShow(x, y, ...args);
  }

  protected hideView(...args: any[]): void {
    this.viewComponent.prepareToHide(...args);
  }

  protected onAction(actionId?: number, ...args: any[]): void {
    this.hideView(actionId);
  }

  protected onViewShow(backgroundBlurEnabled: boolean = false): void {
    this.sendNotification(
      (this.viewComponent.constructor as any).SHOW_START_NOTIFICATION,
      this.viewComponent,
    );
    this.sendNotification(
      StandardPopup.SHOW_START_NOTIFICATION,
      backgroundBlurEnabled,
      this.viewComponent,
    );
  }
  protected onViewShowComplete(): void {
    this.sendNotification(
      (this.viewComponent.constructor as any).SHOW_COMPLETE_NOTIFICATION,
    );
  }
  protected onViewHide(): void {
    this.sendNotification(
      (this.viewComponent.constructor as any).HIDE_START_NOTIFICATION,
    );
  }
  protected onViewHideComplete(...args: any[]): void {
    this.sendNotification(
      (this.viewComponent.constructor as any).HIDE_COMPLETE_NOTIFICATION,
    );
  }

  protected setViewComponentListeners(): void {
    //
  }

  protected registerEvents(): void {
    this.viewComponent.on(
      StandardPopup.SHOW_START_EVENT,
      this.onViewShow,
      this,
    );
    this.viewComponent.on(
      StandardPopup.SHOW_COMPLETE_EVENT,
      this.onViewShowComplete,
      this,
    );
    this.viewComponent.on(
      StandardPopup.HIDE_START_EVENT,
      this.onViewHide,
      this,
    );
    this.viewComponent.on(
      StandardPopup.HIDE_COMPLETE_EVENT,
      this.onViewHideComplete,
      this,
    );
    this.viewComponent.on(StandardPopup.ACTION_EVENT, this.onAction, this);
  }

  get scene(): PopupScene {
    return getScene(PopupScene.NAME) as PopupScene;
  }
}
