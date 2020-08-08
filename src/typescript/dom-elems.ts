const getElement = (selector: string): HTMLElement => document.querySelector(selector);

export const DOMElements = {
  // WELCOME PAGE
  modalWrapper: <HTMLDivElement>getElement('.modal'),
  modalRegister: <HTMLDivElement>getElement('.modal__register'),
  navigateToLogin: <HTMLDivElement>getElement('.link-to-login'),
  modalLogin: <HTMLDivElement>getElement('.modal__login'),
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
  navigateToLogOut: <HTMLAnchorElement>getElement('.nav__item--log-out'),


}
