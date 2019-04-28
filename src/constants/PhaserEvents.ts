export enum POINTER_EVENT {
  UP = 'pointerup',
  DOWN = 'pointerdown',
  OVER = 'pointerover',
  OUT = 'pointerout',
  MOVE = 'pointermove',
}

export enum DRAG_EVENT {
  START = 'dragstart',
  DRAG = 'drag',
  DROP = 'drop',
  END = 'dragend',
}

export enum TEXTURE_EVENT {
  ADD_TEXTURE = 'addtexture',
}

export enum SPINE_EVENT {
  CHANGE_DATA = 'changedata',
  SET_DATA = 'setdata',
  REMOVE_DATA = 'removedata',
  DESTROY = 'destroy',
  START = 'spine.start',
  END = 'spine.end',
  UPDATE = 'spine.update',
  EVENT = 'spine.event',
  COMPLETE = 'spine.complete',
}

export enum LOADER_EVENT {
  PROGRESS = 'progress',
  COMPLETE = 'complete',
  FILE_PROGRESS = 'fileprogress',
  FILE_COMPLETE = 'filecomplete',
}

export enum ANIMATION_EVENT {
  START = 'animationstart',
  COMPLETE = 'animationcomplete',
}

export enum SCENE_EVENT {
  START = 'start',
  READY = 'ready',
  RESIZE = 'resize',
  PAUSE = 'pause',
  RESUME = 'resume',
  SLEEP = 'sleep',
  WAKE = 'wake',
  SHUT_DOWN = 'shutdown',
  DESTROY = 'destroy',
  TRANSITION_INIT = 'transitioninit',
  TRANSITION_COMPLETE = 'transitioncomplete',
  TRANSITION_OUT = 'transitionout',
  PRE_UPDATE = 'preupdate',
  UPDATE = 'update',
  POST_UPDATE = 'postupdate',
}

export enum GAME_EVENT {
  READY = 'ready',
}
