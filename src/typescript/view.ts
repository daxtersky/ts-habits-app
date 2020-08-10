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

  public bindNavigateToLoginModalClick = () => {
    DOMElements.navigateToLogin.addEventListener('click', () => {
      DOMElements.modalRegister.classList.remove('modal--active');
      DOMElements.modalLogin.classList.add('modal--active');
    })
  }

  public bindNavigateToRegisterModalClick = () => {
    DOMElements.navigateToRegister.addEventListener('click', () => {
      DOMElements.modalRegister.classList.add('modal--active');
      DOMElements.modalLogin.classList.remove('modal--active');
    })
  }

  public bindRegisterClick = (handler: (config: AuthConfig) => void): void => {
    DOMElements.buttonRegister.addEventListener('click', () => {
      handler({
        email: this.userRegisterMail,
        password: this.userRegisterPassword,
        username: this.userRegisterUsername
      })
    })
  }

  public bindLoginClick = (handler: any): void => {
    DOMElements.buttonLogin.addEventListener('click', () => {
      handler({
        email: this.userLoginMail,
        password: this.userLoginPassword
      })
    })
  }

  public showRegisterResult(isRegistered: boolean): void {
    DOMElements.registerErrorMessage.innerText = isRegistered
      ? ''
      : 'Error! You need to put a correct email, 4-12 character password and 4-12 character username! :)';
  }

  public showLoginResult(isLogged: boolean): void {
    if (!isLogged) {
      DOMElements.loginErrorMessage.innerText = 'Login error!';
    } else {
      DOMElements.loginErrorMessage.innerText = '';
      DOMElements.welcomePage.classList.remove('welcome-page--active')
      DOMElements.habitsPage.classList.add('habits-page--active');
      // DOMElements.welcomePage.style.display = 'none';
      // DOMElements.habitsPage.style.display = 'grid';
      DOMElements.modalLogin.classList.remove('modal--active');
    }
  }

  // HABITS PAGE
  public bindNavigateLogOutClick = (handler: any) => {
    DOMElements.navigateToLogOut.addEventListener('click', () => {
      handler();
    })
  }

  public showLogoutResult(isLogged: boolean): void {
    if (!isLogged) {
      DOMElements.welcomePage.classList.add('welcome-page--active')
      DOMElements.habitsPage.classList.remove('habits-page--active');
      // DOMElements.welcomePage.style.display = 'grid';
      // DOMElements.habitsPage.style.display = 'none';
      DOMElements.modalLogin.classList.add('modal--active');
    }
  }

}