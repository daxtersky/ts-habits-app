import '../scss/main.scss';
import view from './view';
import model from './model';
import { MyEnum } from './enums';
import { MyInterface } from './models';

document.addEventListener('DOMContentLoaded', (): void => {
  document.querySelector('h1').textContent = view.view;
  document.querySelector('p').textContent = model.model;

  console.log('model', model.model);
  console.log('view', view.view);
});
