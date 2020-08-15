import { AuthConfig } from './types';
import { DOMElements } from './dom-elems';

export class View {
  get userRegisterMail() { return DOMElements.inputRegisterEmail.value }
  get userRegisterPassword() { return DOMElements.inputRegisterPassword.value }
  get userRegisterUsername() { return DOMElements.inputRegisterUsername.value }
  get userLoginMail() { return DOMElements.inputLoginEmail.value }
  get userLoginPassword() { return DOMElements.inputLoginPassword.value }

  constructor() {
    document.addEventListener('click', e => e.preventDefault());
    DOMElements.inputRegisterEmail.select();
  }

  // WELCOME PAGE
  public bindNavigateToLoginModalClick = (): void => {
    DOMElements.navigateToLogin.addEventListener('click', () => {
      DOMElements.modalRegister.classList.remove('modal--active');
      DOMElements.modalLogin.classList.add('modal--active');
    })
  }
  public bindNavigateToRegisterModalClick = (): void => {
    DOMElements.navigateToRegister.addEventListener('click', () => {
      DOMElements.modalRegister.classList.add('modal--active');
      DOMElements.modalLogin.classList.remove('modal--active');
    })
  }

  public displayRegisterUserState = (errorMessage: string): void => {
    DOMElements.registerErrorMessage.innerText = errorMessage;
  }
  public displayUserState = (errorMessage: string): void => {
    DOMElements.loginErrorMessage.innerText = errorMessage;
  }

  public listenerRegisterClick = (handler: (config: AuthConfig) => void): void => {
    DOMElements.buttonRegister.addEventListener('click', () => {
      handler({
        email: this.userRegisterMail,
        password: this.userRegisterPassword,
        username: this.userRegisterUsername
      })
    })
  }
  public listenerLoginClick = (handler: any): void => {
    DOMElements.buttonLogin.addEventListener('click', () => {
      handler({
        email: this.userLoginMail,
        password: this.userLoginPassword
      })
    })
  }

  public navigateToLoginPage = (): void => {
    DOMElements.welcomePage.classList.add('welcome-page--active')
    DOMElements.habitsPage.classList.remove('habits-page--active');
    DOMElements.modalLogin.classList.add('modal--active');
  }
  public navigateToHabitsPage = (): void => {
    DOMElements.welcomePage.classList.remove('welcome-page--active')
    DOMElements.habitsPage.classList.add('habits-page--active');
    DOMElements.modalRegister.classList.remove('modal--active');
    DOMElements.modalLogin.classList.remove('modal--active');
  }

  // HABITS PAGE
  public bindNavigateLogOutClick = (handler: any): void => {
    DOMElements.navigateToLogOut.addEventListener('click', () => {
      handler();
    })
  }

}