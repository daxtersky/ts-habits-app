export class View {
  constructor() {
    const vp = this.getElement('.view') as HTMLParagraphElement;
    vp.textContent = this.write();
    this.listeners();
  }
  viewMessage = 'from view.ts';

  public buttonEvent = (handler: (arg: string) => void) => {
    this.buttonElement.addEventListener('click', event => {
      if ((event.target as Element).className === 'button') {

        handler(this.viewMessage);
        console.log('2 button clicked', handler, event);
      }
    })
  }

  public write = (): string => 'message from View Class!';

  private getElement = (selector: string): HTMLElement => document.querySelector(selector);

  private buttonElement = this.getElement('.button') as HTMLButtonElement;

  private listeners = () => {
    addEventListener('click', event => {
      console.log('1 click from view', event);
    })
  }

}