import '../scss/main.scss';

export class View {
  private viewMessage: string;
  private getElement = (selector: string): HTMLElement => document.querySelector(selector);
  private paragraph = <HTMLParagraphElement>this.getElement('.view');
  private button = <HTMLButtonElement>this.getElement('.button');

  constructor() {
    this.paragraph.textContent = this.write();
    this.viewMessage = '!from view.ts!';
  }

  public buttonEvent = (handler: (arg: string) => void) => {
    this.button.addEventListener('click', event => {
      if ((event.target as Element).className === 'button') {
        handler(this.viewMessage);
        console.log('2 button clicked', handler, event);
      }
    })
  }

  public write = (): string => 'message from View Class!';

}