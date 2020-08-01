import { View } from './view';
import { Model } from './model';

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    this.view.buttonEvent(this.handleButtonClick);
  }

  private handleButtonClick = (data: string): void => {
    console.log('btn controller.ts', data);
    this.model.listenButtonClick(data);
  }
}

