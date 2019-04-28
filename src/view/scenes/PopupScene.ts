import { gameConfig } from '../../constants/GameConfig';
import StandardPopup from '../popups/StandardPopup';
import BaseScene from './BaseScene';

export default class PopupScene extends BaseScene {
  public static NAME: string = 'PopupScene';
  public static REGISTERD_NOTIFICATION: string = `${
    PopupScene.NAME
  }RegisterdNotification`;

  public static POPUP_PREPARE_TO_SHOW_EVENT: string = `PopupPrepareToShow`;
  public static POPUP_SHOW_START_EVENT: string = `PopupShowStart`;
  public static POPUP_SHOW_COMPLETE_EVENT: string = `PopupShowComplete`;

  public static POPUP_PREPARE_TO_HIDE_EVENT: string = `PopupPrepareToHide`;
  public static POPUP_HIDE_START_EVENT: string = `PopupHideStart`;
  public static POPUP_HIDE_COMPLETE_EVENT: string = `PopupHideComplete`;

  public static SETTING_CHANGE_EVENT: string = `settingChange`;
  public static LANGUAGE_CHANGE_EVENT: string = `languageChange`;

  public popupCamera: Phaser.Cameras.Scene2D.Camera;
  private currentPopup: any;
  constructor() {
    super(PopupScene.NAME);
  }

  public create(): void {
    this.popupCamera = this.cameras.add(
      0,
      0,
      gameConfig.canvasWidth,
      gameConfig.canvasHeight,
    );
    this.popupCamera.setZoom(gameConfig.scaleMultiplier);
    this.input.topOnly = true;
  }

  public addPopup(popup: StandardPopup): void {
    this.currentPopup = this.add.existing(popup);
    this.mainCamera.ignore(this.currentPopup);
  }

  public removePopup(): void {
    this.sys.displayList.remove(this.currentPopup);
  }

  get mainCamera(): Phaser.Cameras.Scene2D.Camera {
    return this.cameras.main;
  }
}
