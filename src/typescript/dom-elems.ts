const getElement = (selector: string): HTMLElement => document.querySelector(selector);
const getElements = (selector: string): HTMLElement[] => Array.from(document.querySelectorAll(selector));

export const DOMElements = {
  spinner: <HTMLDivElement>getElement('.spinner'),
  // WELCOME PAGE
  modalRegister: <HTMLDivElement>getElement('.modal--register'),
  navigateToLogin: <HTMLDivElement>getElement('.link-to-login'),
  modalLogin: <HTMLDivElement>getElement('.modal--login'),
  navigateToRegister: <HTMLDivElement>getElement('.link-to-register'),

  welcomePage: <HTMLElement>getElement('.welcome-page'),
  inputRegisterEmail: <HTMLInputElement>getElement('.modal__input--register-email'),
  inputRegisterPassword: <HTMLInputElement>getElement('.modal__input--register-password'),
  inputRegisterUsername: <HTMLInputElement>getElement('.modal__input--register-name'),
  inputLoginEmail: <HTMLInputElement>getElement('.modal__input--login-email'),
  inputLoginPassword: <HTMLInputElement>getElement('.modal__input--login-password'),
  buttonRegister: <HTMLButtonElement>getElement('.button--auth--register'),
  buttonLogin: <HTMLButtonElement>getElement('.button--auth--login'),
  registerErrorMessage: <HTMLParagraphElement>getElement('.modal__text--register-error'),
  loginErrorMessage: <HTMLParagraphElement>getElement('.modal__text--login-error'),

  // HABITS PAGE
  habitsPage: <HTMLElement>getElement('.habits-page'),
  username: <HTMLSpanElement>getElement('.header__username'),
  userHabits: <HTMLOListElement>getElement('.habits-wrapper__list--user-list'),
  userHabitItem: <HTMLLIElement>getElement('.habits-wrapper__item'),
  addHabit: <HTMLButtonElement>getElement('.button--add-habit'),
  modalHabit: <HTMLDivElement>getElement('.modal--habit'),
  buttonHabitConfirm: <HTMLButtonElement>getElement('.button--habit-confirm'),
  modalSettings: <HTMLDivElement>getElement('.modal--settings'),
  buttonSettingsConfirm: <HTMLButtonElement>getElement('.button--settings-confirm'),
  navigateToSettings: <HTMLAnchorElement>getElement('.nav__item--settings'),
  buttonModalClose: <HTMLButtonElement[]>getElements('.button--close'),
  navigateToLogOut: <HTMLAnchorElement>getElement('.nav__item--log-out'),
}
