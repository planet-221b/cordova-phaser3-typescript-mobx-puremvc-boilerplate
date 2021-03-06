import { Images } from '../../assets';
import { gameConfig } from '../../constants/GameConfig';
import Game from '../../Game';
import PlayerVOProxy from '../../model/PlayerVOProxy';
import { loadImages } from '../utils/assetLoader';
import BaseScene from './BaseScene';

export default class BootScene extends BaseScene {
  public static NAME: string = 'BootScene';
  public static LOAD_COMPLETE_NOTIFICATION: string = `${
    BootScene.NAME
  }LoadCompleteNotification`;
  public static LOAD_COMPLETE_EVENT: string = `${BootScene.NAME}loadComplete`;

  public game: Game;
  private logo: Phaser.GameObjects.Sprite;
  constructor() {
    super(BootScene.NAME);
  }
  public preload(): void {
    loadImages(this, Images);
  }

  public create(): void {
    this.logo = this.add.sprite(
      gameConfig.canvasWidth / 2,
      gameConfig.canvasHeight / 2,
      Images.Logo.Name,
    );
    this.logo.alpha = 0;
    this.tweens.add({
      targets: this.logo,
      alpha: 1,
      duration: 1500,
      yoyo: true,
      onComplete: () => {
        this.i18n.initialize(
          {
            fallbackLng: PlayerVOProxy.defaultLanguage,
            loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
            debug: false,
          },
          () => {
            this.events.emit(BootScene.LOAD_COMPLETE_EVENT);
          },
        );
      },
    });
  }
}
