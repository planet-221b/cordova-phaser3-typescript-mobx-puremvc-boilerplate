import 'phaser';
import { I18nPlugin } from '@koreez/phaser3-i18n';
import { NinePatchPlugin } from '@koreez/phaser3-ninepatch';
import { isNullOrUndefined } from 'util';
import { gameConfig } from './constants/GameConfig';
import Game from './Game';

let gameConfiguration: IConfig;

function setUpDimension(): void {
  let screenWidth: number = window.innerWidth / window.devicePixelRatio;
  let screenHeight: number = window.innerHeight / window.devicePixelRatio;
  if (
    screenWidth / screenHeight >
    gameConfig.designWidth / gameConfig.designHeight
  ) {
    screenWidth = 1080;
    screenHeight = 1920;
  }
  const designWidth: number = gameConfig.designWidth;
  const multiplier: number = designWidth / screenWidth;
  gameConfig.canvasWidth = designWidth;
  gameConfig.canvasHeight = screenHeight * multiplier;
}

function startGame(): void {
  gameConfiguration = {
    type: Phaser.WEBGL,
    width: gameConfig.canvasWidth,
    height: gameConfig.canvasHeight,
    backgroundColor: '#ffffff',
    parent: 'game-container',
    title: 'Game Name',
    scene: [],
    transparent: true,
    dom: {
      createContainer: true,
    },
    plugins: {
      global: [
        { key: 'NinePatchPlugin', plugin: NinePatchPlugin, start: true },
      ],
      scene: [
        { key: 'i18nPlugin', plugin: I18nPlugin, mapping: 'i18n' },
        {
          key: 'SpineWebGLPlugin',
          url: 'plugins/SpineWebGLPlugin.js',
          sceneKey: 'spine',
        },
      ],
    },
    banner: {
      text: '#ffffff',
      background: ['#fff200', '#38f0e8', '#00bff3', '#ec008c'],
      hidePhaser: false,
    },
    // physics: {
    //   default: 'matter',
    //   matter: {
    //     gravity: {
    //       scale: 0,
    //     },
    //     plugins: {
    //       attractors: true,
    //     },
    //   },
    // },
  };
  new Game(gameConfiguration);
}

function loadWebFont(callback: () => any): void {
  setTimeout(() => {
    callback();
  }, 1000);
}

window.onload = () => {
  if (window.isMobile()) {
    let script = document.createElement('script');
    script.src = 'cordova.js';
    document.head.append(script);
  }

  loadWebFont(() => {
    setUpDimension();
    startGame();
  });
};

document.addEventListener('deviceready', () => {
  if (window.cordova) {
    if (window.cordova.platformId === 'android') {
      if (!isNullOrUndefined(window.AndroidFullScreen)) {
        AndroidFullScreen.isSupported(
          () => {
            AndroidFullScreen.immersiveMode();
          },
          (error: any) => {
            console.error(error);
          },
        );
      }
    }

    document.addEventListener(
      'backbutton',
      () => {
        // back button action
      },
      false,
    );
  }
});

export interface IConfig {
  type: number;
  width: number;
  height: number;
  parent: string;
  scene: any[];
  title: string;
  backgroundColor: string;
  transparent: boolean;
  dom: any;
  plugins?: any;
  banner?: any;
  physics?: any;
}
