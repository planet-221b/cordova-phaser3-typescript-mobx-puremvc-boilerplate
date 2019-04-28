import StandardPopup from '../popups/StandardPopup';

export default class PopupManager<T extends StandardPopup> {
  public currentShownPopup: T;
  private static _instance: PopupManager<StandardPopup>;
  private queue: IQueue<T>[] = [];

  public static get instance(): PopupManager<StandardPopup> {
    return this._instance || (this._instance = new this());
  }

  public addToQueue(popup: T, x: number, y: number, ...args: any[]): void {
    this.queue.push({
      popup: popup,
      x,
      y,
      args,
    });
  }

  public removeFromQueue(popup: T, ...args: any[]): void {
    const target: any = this.queue.filter((queueData: any) => {
      return (
        queueData.popup === popup && (args ? queueData.args === args : true)
      );
    })[0];
    this.queue.splice(this.queue.indexOf(target), 1);
  }

  public show(popup: T, x: number, y: number, ...args: any[]): void {
    this.queue.push({
      popup: popup,
      x,
      y,
      args,
    });
    if (this.queue.length === 1) {
      this.internalShow();
    }
  }

  public async hide(popup: T, actionId?: number): Promise<void> {
    return await popup.hide(actionId);
  }

  public popupHideComplete(popup: T): void {
    if (this.currentShownPopup !== popup) {
      throw 'closing wrong popup';
    }
    this.queue.shift();
    this.currentShownPopup = null;
    if (this.hasQueue) {
      this.internalShow();
    }
  }

  private internalShow(): void {
    const { popup, x, y, args } = this.queue[0];
    this.currentShownPopup = popup;
    popup.show(x, y, ...args);
  }

  get hasQueue(): boolean {
    return !!this.queue.length;
  }
}

interface IQueue<T extends StandardPopup> {
  popup: T;
  x: number;
  y: number;
  args: any[];
}
