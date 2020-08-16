import { AuthConfig, Habit } from './types';
import { DOMElements } from './dom-elems';

export class View {

  // WELCOME PAGE
  get userRegisterMail() { return DOMElements.inputRegisterEmail.value }
  get userRegisterPassword() { return DOMElements.inputRegisterPassword.value }
  get userRegisterUsername() { return DOMElements.inputRegisterUsername.value }
  get userLoginMail() { return DOMElements.inputLoginEmail.value }
  get userLoginPassword() { return DOMElements.inputLoginPassword.value }
  // HABITS PAGE
  //
  // get habitName() { returm DOMElements.input... }

  constructor() {
    document.addEventListener('click', e => e.preventDefault());
    DOMElements.inputRegisterEmail.select();
  }

  // WELCOME PAGE
  public navigateToLoginModalClick = (): void => {
    DOMElements.navigateToLogin.addEventListener('click', () => {
      DOMElements.modalRegister.classList.remove('modal--active');
      DOMElements.modalLogin.classList.add('modal--active');
    })
  }
  public navigateToRegisterModalClick = (): void => {
    DOMElements.navigateToRegister.addEventListener('click', () => {
      DOMElements.modalRegister.classList.add('modal--active');
      DOMElements.modalLogin.classList.remove('modal--active');
    })
  }
  public navigateToLoginPage = (): void => {
    DOMElements.welcomePage.classList.add('welcome-page--active')
    DOMElements.habitsPage.classList.remove('habits-page--active');
    DOMElements.modalLogin.classList.add('modal--active');
  }
  public navigateToHabitsPage = (username: string): void => {
    DOMElements.welcomePage.classList.remove('welcome-page--active')
    DOMElements.habitsPage.classList.add('habits-page--active');
    DOMElements.modalRegister.classList.remove('modal--active');
    DOMElements.modalLogin.classList.remove('modal--active');
    DOMElements.username.innerText = username;
  }

  public listenerRegisterClick = (handler: (config: AuthConfig) => void): void => {
    DOMElements.buttonRegister.addEventListener('click', () => {
    this.showSpinner();
    handler({
        email: this.userRegisterMail,
        password: this.userRegisterPassword,
        username: this.userRegisterUsername
      })
    })
  }
  public listenerLoginClick = (handler: (config: AuthConfig) => void): void => {
    DOMElements.buttonLogin.addEventListener('click', () => {
      this.showSpinner();
      handler({
        email: this.userLoginMail,
        password: this.userLoginPassword
      })
      DOMElements.modalRegister.classList.remove('modal--active');
      DOMElements.modalLogin.classList.add('modal--active');
    })
  }

  public displayRegisterState = (errorMessage: string): void => {
    DOMElements.registerErrorMessage.innerText = errorMessage;
  }
  public displayLoginState = (errorMessage: string): void => {
    DOMElements.loginErrorMessage.innerText = errorMessage;
  }

  // HABITS PAGE
  public navigateToHabitModalClick = (): void => {
    DOMElements.addHabit.addEventListener('click', () => {
      DOMElements.modalHabit.classList.add('modal--active');
      DOMElements.habitsPage.classList.add('habits-page--disabled');
    })
  }
  public navigateAfterOkHabitModalClick = (): void => {
    DOMElements.buttonHabitConfirm.addEventListener('click', () => {
      console.log('CONFIRM HABIT!');
      DOMElements.modalHabit.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    })
  }
  public navigateToSettingsModalClick = (): void => {
    DOMElements.navigateToSettings.addEventListener('click', () => {
      DOMElements.modalSettings.classList.add('modal--active');
      DOMElements.habitsPage.classList.add('habits-page--disabled');
    })
  }
  public navigateAfterOkSettingsModalClick = (): void => {
    DOMElements.buttonSettingsConfirm.addEventListener('click', () => {
      console.log('CONFIRM HABIT!');
      DOMElements.modalSettings.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    })
  }
  public navigateToCloseModalClick = (): void => {
    DOMElements.buttonModalClose.forEach(button => button.addEventListener('click', e => {
      (e.target as HTMLElement).classList.contains('button--close-habit') // else 'button--close-settings'
        ? DOMElements.modalHabit.classList.remove('modal--active')
        : DOMElements.modalSettings.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    }));
  }
  public navigateToLogoutClick = (handler: any): void => {
    DOMElements.navigateToLogOut.addEventListener('click', () => {
      this.showSpinner();
      handler();
    })
  }

  public displayHabits = (habits: Habit[]): void => {
    habits.forEach(habit => {
      const newHabit = document.createElement('li');
      newHabit.innerText = habit.name;
      newHabit.classList.add('habits-wrapper__item');
      DOMElements.userHabits.appendChild(newHabit);
    })
  }
  // SHARED
  private showSpinner = () => DOMElements.spinner.classList.add('spinner--active');
  public hideSpinner = () => DOMElements.spinner.classList.remove('spinner--active');

}