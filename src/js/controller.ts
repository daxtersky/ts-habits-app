import '../scss/main.scss';
import { View } from './view';
import { Model } from './model';
import { MyEnum } from './enums';
import { MyInterface } from './types';
import { ClassElement } from 'typescript';

document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOMContentLoaded', controller);
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    this.view.buttonEvent(this.handleButtonClick);
  }

  handleButtonClick = (data: string): void => {
    console.log('3 event goes to controller', data);
    this.model.showInModel(data);
  }
}

