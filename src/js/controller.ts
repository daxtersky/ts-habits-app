import '../scss/main.scss';
import { View } from './view';
import { Model } from './model';
import { MyEnum } from './enums';
import { MyInterface } from './types';
import { ClassElement } from 'typescript';

document.addEventListener('DOMContentLoaded', (): void => {
  const controller = new Controller(new View(), new Model());
  // console.log('DOMContentLoaded', controller);
});

class Controller {
  constructor(view: View, model: Model) {
    // view.log();
    // model.log();
    // console.log('VIEW', view);
    view.buttonEvent(this.handleButtonClick);
  }

  handleButtonClick = (a) => {
   console.log('3 event goes to controller', a);
  }
}

