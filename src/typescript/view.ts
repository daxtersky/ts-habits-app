import '../scss/main.scss';
import { AuthConfig } from './types';

export class View {
  private getElement = (selector: string): HTMLElement => document.querySelector(selector);

  private inputRegisterEmail = <HTMLInputElement>this.getElement('.modal__input--register-email'); // TODO validation
  private inputRegisterPassword = <HTMLInputElement>this.getElement('.modal__input--register-password');
  private inputRegisterUsername = <HTMLInputElement>this.getElement('.modal__input--register-name');
  private inputLoginEmail = <HTMLInputElement>this.getElement('.modal__input--login-email'); // TODO validation
  private inputLoginPassword = <HTMLInputElement>this.getElement('.modal__input--login-password');
  private buttonRegister = <HTMLButtonElement>this.getElement('.button--auth--register');
  private buttonLogin = <HTMLButtonElement>this.getElement('.button--auth--login');
  private errorMessage = <HTMLParagraphElement>this.getElement('.modal__text--register-error');
  // private linkToLogin = <HTMLAnchorElement>this.getElement('.link-to-login');

  get userRegisterMail() { return this.inputRegisterEmail.value }
  get userRegisterPassword() { return this.inputRegisterPassword.value }
  get userRegisterUsername() { return this.inputRegisterUsername.value }
  get userLoginMail() { return this.inputLoginEmail.value }
  get userLoginPassword() { return this.inputLoginPassword.value }

  constructor() {
    document.addEventListener('click', e => e.preventDefault());
    this.inputRegisterEmail.select();
  }

  public bindRegisterClick = (handler: any): void => {
    this.buttonRegister.addEventListener('click', event => {
      if ((event.target as Element).className.includes(this.buttonRegister.className)) {
        const registerConfig: AuthConfig = {
          email: this.userRegisterMail,
          password: this.userRegisterPassword,
          username: this.userRegisterUsername
        }
        handler(registerConfig);
      }
    })
  }

  validationCheck(isRegistered) {
    console.log('VIEW user is registered?', isRegistered);
    if (isRegistered) {
      this.errorMessage.innerText = '';
    } else {
      this.errorMessage.innerText = 'error';
    }
  }

  public bindLoginClick = (handler: any): void => {
    this.buttonLogin.addEventListener('click', event => {
      if ((event.target as Element).className.includes(this.buttonLogin.className)) {
        const loginConfig: AuthConfig = {
          email: this.userLoginMail,
          password: this.userLoginPassword,
        }
        handler(loginConfig);
      }
    })
  }

  // 1
  // 2
  // show error validation in html

}