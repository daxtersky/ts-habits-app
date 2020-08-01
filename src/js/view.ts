export class View {
  constructor() {
    const vp = this.getElement('.v-model') as HTMLParagraphElement;
    vp.textContent = this.write();
    this.listeners();
  }

  public log = (): void => console.log('This is from View Class!');

  public write = (): string => 'message from View Class!';

  public buttonEvent = (handler) => {
    this.buttonElement.addEventListener('click', event => {
      if ((event.target as Element).className === 'button') {
        handler(event);
        console.log('2 button clicked');
      }
    })
  }

  private getElement = (selector: string): HTMLElement => document.querySelector(selector);
  private buttonElement = this.getElement('.button') as HTMLButtonElement;
  private listeners = () => {
    addEventListener('click', event => {
      console.log('1 click from view');
    })
  }

}