import '../scss/main.scss';

export class View {
  private viewMessage: string;
  private getElement = (selector: string): HTMLElement => document.querySelector(selector);
  // private paragraph = <HTMLParagraphElement>this.getElement('.view');
  private button = <HTMLButtonElement>this.getElement('.button');

  constructor() {
  }

  //// App views
  // 1. homepage
  // 2. sign in / sign up (popup?)
  // 3. main habit list
  // 4. habit view (popup)
  // 5. settings
  // 6. statystyki historia nawyków (graf)*

  public buttonEvent = (handler: any): void => {
    this.button?.addEventListener('click', event => {
      if ((event.target as Element).className === 'button') {
        handler(event);
        console.log('btn view.ts', handler, event);
      }
    })
  }

}