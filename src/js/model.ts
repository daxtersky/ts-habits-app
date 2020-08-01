export class Model {
  constructor() {
    const mp = this.getElement('.m-model') as HTMLParagraphElement;
    mp.textContent = this.write();
  }

  log = (): void => console.log('This is from Model Class!');
  write = (): string => 'message from Model Class!';


  getElement = (selector: string): HTMLElement => document.querySelector(selector);

}