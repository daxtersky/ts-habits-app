const getElement = (selector: string): HTMLElement => document.querySelector(selector);
const getElements = (selector: string): HTMLElement[] => Array.from(document.querySelectorAll(selector));

export const DOMElements = {
  spinner: <HTMLDivElement>getElement('.spinner'),
  registerErrorMessage: <HTMLParagraphElement>getElement('.modal__text--register-error'),
  loginErrorMessage: <HTMLParagraphElement>getElement('.modal__text--login-error'),
  username: <HTMLSpanElement>getElement('.header__username'),
  userHabits: <HTMLOListElement>getElement('.habits-wrapper__list--user-list'),
  userHabitItems: <HTMLLIElement[]>getElements('.habits-wrapper__item'),
  // PAGES & MODALS
  welcomePage: <HTMLElement>getElement('.welcome-page'),
  habitsPage: <HTMLElement>getElement('.habits-page'),
  modalRegister: <HTMLDivElement>getElement('.modal--register'),
  modalLogin: <HTMLDivElement>getElement('.modal--login'),
  modalHabit: <HTMLDivElement>getElement('.modal--habit'),
  modalHabitTitle: <HTMLDivElement>getElement('.modal__title--habit'),
  modalSettings: <HTMLDivElement>getElement('.modal--settings'),
  // INPUTS
  inputRegisterEmail: <HTMLInputElement>getElement('.modal__input--register-email'),
  inputRegisterPassword: <HTMLInputElement>getElement('.modal__input--register-password'),
  inputRegisterUsername: <HTMLInputElement>getElement('.modal__input--register-name'),
  inputLoginEmail: <HTMLInputElement>getElement('.modal__input--login-email'),
  inputLoginPassword: <HTMLInputElement>getElement('.modal__input--login-password'),
  inputHabitName:<HTMLInputElement>getElement('.modal__input--habit-name'),
  // LINKS
  navigateToLogin: <HTMLAnchorElement>getElement('.link-to-login'),
  navigateToRegister: <HTMLAnchorElement>getElement('.link-to-register'),
  navigateToSettings: <HTMLAnchorElement>getElement('.nav__item--settings'),
  navigateToLogOut: <HTMLAnchorElement>getElement('.nav__item--log-out'),
  navigateToManageHabitModal: <HTMLButtonElement>getElement('.button--add-habit'), // TODO managehabitmodal?
  // BUTTONS
  buttonToRegister: <HTMLButtonElement>getElement('.button--auth--register'),
  buttonToLogin: <HTMLButtonElement>getElement('.button--auth--login'),
  buttonToHabitConfirm: <HTMLButtonElement>getElement('.button--habit-confirm'),
  buttonToHabitDelete: <HTMLButtonElement>getElement('.button--habit-delete'),
  buttonToSettingsConfirm: <HTMLButtonElement>getElement('.button--settings-confirm'),
  buttonToModalClose: <HTMLButtonElement[]>getElements('.button--close'),
}
