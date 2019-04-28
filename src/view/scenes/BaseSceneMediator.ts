import { SCENE_EVENT } from '../../constants/PhaserEvents';
import Game from '../../Game';
import GameFacade from '../../GameFacade';
import PlayerVOProxy from '../../model/PlayerVOProxy';
import { postRunnable } from '../../utils/Utils';
import { BaseMediator } from '../base/BaseMediator';
import BaseScene from './BaseScene';

export default abstract class BaseSceneMediator<
  T extends BaseScene
> extends BaseMediator<T> {
  constructor(name: string, viewComponent: T) {
    super(name, viewComponent);

    if (this.viewComponent) {
      this.registerEvents();
    }
  }

  public registerNotificationInterests(): void {
    //
  }

  public setViewComponent(viewComponent: T): void {
    super.setViewComponent(viewComponent);
    this.setViewComponentListeners();
    this.registerEvents();
  }

  public onRegister(): void {
    this.setView();
    super.onRegister();
  }

  protected async startScene(): Promise<void> {
    postRunnable(() => {
      this.sceneManager.start((this.viewComponent.constructor as any)['NAME']);
    });
  }

  protected async stopScene(): Promise<void> {
    this.sceneManager.stop((this.viewComponent.constructor as any)['NAME']);
  }

  protected setView(): void {
    //
  }

  protected setViewComponentListeners(): void {
    //
  }

  protected registerEvents(): void {
    this.viewComponent.events.on(SCENE_EVENT.START, this.onSceneStart, this);
    this.viewComponent.events.on(SCENE_EVENT.READY, this.onSceneReady, this);
    this.viewComponent.events.on(SCENE_EVENT.RESIZE, this.onSceneResize, this);
    this.viewComponent.events.on(SCENE_EVENT.PAUSE, this.onScenePause, this);
    this.viewComponent.events.on(SCENE_EVENT.RESUME, this.onSceneResume, this);
    this.viewComponent.events.on(SCENE_EVENT.SLEEP, this.onSceneSleep, this);
    this.viewComponent.events.on(SCENE_EVENT.WAKE, this.onSceneWake, this);
    this.viewComponent.events.on(
      SCENE_EVENT.TRANSITION_INIT,
      this.onSceneTransitionInit,
      this,
    );
    this.viewComponent.events.on(
      SCENE_EVENT.TRANSITION_COMPLETE,
      this.onSceneTransitionComplete,
      this,
    );
    this.viewComponent.events.on(
      SCENE_EVENT.TRANSITION_OUT,
      this.onSceneTransitionOut,
      this,
    );
    this.viewComponent.events.on(
      SCENE_EVENT.SHUT_DOWN,
      this.onSceneShutdown,
      this,
    );
    this.viewComponent.events.on(
      SCENE_EVENT.DESTROY,
      this.onSceneDestroy,
      this,
    );
  }

  protected registerPreupdateEvent(): void {
    this.viewComponent.events.on(
      SCENE_EVENT.PRE_UPDATE,
      this.onScenePreupdate,
      this,
    );
  }

  protected registerUpdateEvent(): void {
    this.viewComponent.events.on(SCENE_EVENT.UPDATE, this.onSceneUpdate, this);
  }

  protected registerPostupdateEvent(): void {
    this.viewComponent.events.on(
      SCENE_EVENT.POST_UPDATE,
      this.onScenePostupdate,
      this,
    );
  }

  protected updateLanguage(): void {
    const playerVOProxy: PlayerVOProxy = this.facade.retrieveProxy(
      PlayerVOProxy.NAME,
    );
    if (playerVOProxy) {
      this.viewComponent.updateLanguage(playerVOProxy.vo.settings.lang);
    }
  }

  protected onSceneStart(): void {
    this.sendNotification((this.viewComponent.constructor as any)['START']);
  }

  protected onSceneReady(): void {
    this.sendNotification((this.viewComponent.constructor as any)['READY']);
  }

  protected onScenePreupdate(): void {
    this.sendNotification((this.viewComponent.constructor as any)['PREUPDATE']);
  }

  protected onSceneUpdate(): void {
    this.sendNotification((this.viewComponent.constructor as any)['UPDATE']);
  }

  protected onScenePostupdate(): void {
    this.sendNotification(
      (this.viewComponent.constructor as any)['POSTUPDATE'],
    );
  }

  protected onSceneResize(): void {
    this.sendNotification((this.viewComponent.constructor as any)['RESIZE']);
  }

  protected onScenePause(): void {
    this.sendNotification((this.viewComponent.constructor as any)['PAUSE']);
  }

  protected onSceneResume(): void {
    this.sendNotification((this.viewComponent.constructor as any)['RESUME']);
  }

  protected onSceneSleep(): void {
    this.sendNotification((this.viewComponent.constructor as any)['SLEEP']);
  }

  protected onSceneWake(): void {
    this.sendNotification((this.viewComponent.constructor as any)['WAKE']);
  }

  protected onSceneTransitionInit(): void {
    this.sendNotification(
      (this.viewComponent.constructor as any)['TRANSITION_INIT'],
    );
  }

  protected onSceneTransitionComplete(): void {
    this.sendNotification(
      (this.viewComponent.constructor as any)['TRANSITION_COMPLETE'],
    );
  }

  protected onSceneTransitionOut(): void {
    this.sendNotification(
      (this.viewComponent.constructor as any)['TRANSITION_OUT'],
    );
  }

  protected onSceneShutdown(): void {
    this.sendNotification((this.viewComponent.constructor as any)['SHUTDOWN']);
  }

  protected onSceneDestroy(): void {
    this.sendNotification((this.viewComponent.constructor as any)['DESTROY']);
  }

  get game(): Game {
    return GameFacade.game as Game;
  }

  get sceneManager(): Phaser.Scenes.SceneManager {
    return this.game.scene;
  }
}
