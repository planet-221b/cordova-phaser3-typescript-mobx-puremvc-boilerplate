import { Audios } from '../../assets';
import { gameConfig } from '../../constants/GameConfig';
import { loadAudios } from '../utils/assetLoader';
import BaseScene from './BaseScene';

export default class ServiceScene extends BaseScene {
  public static NAME: string = 'ServiceScene';
  public static PLAY_SFX_EVENT: string = 'playSFX';
  private sfxManager: Phaser.Sound.WebAudioSoundManager;
  private fadeGraphics: Phaser.GameObjects.Graphics;

  constructor() {
    super(ServiceScene.NAME);
  }

  public preload(): void {
    loadAudios(this, Audios);
  }

  public create(): void {
    this.fadeGraphics = this.add.graphics({});
    this.sfxManager = new Phaser.Sound.WebAudioSoundManager(this.game);
    this.sfxManager.volume = 0.6;
  }

  public async screenFadeOut(
    color: number,
    duration: number,
    delay?: number,
  ): Promise<void> {
    return new Promise<void>(
      (resolve: (value?: void | PromiseLike<void>) => void) => {
        this.fadeGraphics.clear();
        this.scene.bringToTop(ServiceScene.NAME);
        this.fadeGraphics.fillStyle(color);
        this.fadeGraphics.alpha = 0;
        this.fadeGraphics.fillRect(
          0,
          0,
          gameConfig.canvasWidth as number,
          gameConfig.canvasHeight as number,
        );
        this.tweens.killTweensOf(this.fadeGraphics);
        this.tweens.add({
          targets: this.fadeGraphics,
          alpha: 1,
          duration,
          delay,
          onComplete: () => {
            resolve();
          },
        });
      },
    );
  }

  public async screenFadeIn(duration: number, delay?: number): Promise<void> {
    return new Promise<void>(
      (resolve: (value?: void | PromiseLike<void>) => void) => {
        if (this.fadeGraphics.alpha !== 1) {
          resolve();
          return;
        }
        this.scene.bringToTop(ServiceScene.NAME);
        this.tweens.killTweensOf(this.fadeGraphics);
        this.tweens.add({
          targets: this.fadeGraphics,
          alpha: 0,
          duration,
          delay,
          onComplete: () => {
            this.fadeGraphics.clear();
            resolve();
          },
        });
      },
    );
  }

  // public setBackgroundMusicState(enabled: boolean): void {
  //   enabled ? this.playMusic() : this.stopMusic();
  // }

  // public playMusic(): void {
  //   if (this.music.isPlaying) {
  //     return;
  //   }
  //   this.music.play();
  // }

  // public stopMusic(): void {
  //   this.music.stop();
  // }

  public playSFX(sfxName: string): void {
    this.sfxManager.play(sfxName);
  }
}
