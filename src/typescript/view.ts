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
  public bindNavigateToLoginClick = (): void => {
    DOMElements.navigateToLogin.addEventListener('click', () => {
      DOMElements.modalRegister.classList.remove('modal--active');
      DOMElements.modalLogin.classList.add('modal--active');
    })
  }
  public bindNavigateToRegisterClick = (): void => {
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
  public listenerLoginClick = (handler: (config: AuthConfig) => void): void => {
    DOMElements.buttonLogin.addEventListener('click', () => {
      handler({
        email: this.userLoginMail,
        password: this.userLoginPassword
      })
    })
  }

  public navigateToLoginPage = (): void => { // TODO naming wrong
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

  // HABITS PAGE
  public displayHabits = (habits: Habit[]): void => {
    habits.forEach(habit => {
      const newHabit = document.createElement('li');
      newHabit.innerText = habit.name;
      newHabit.classList.add('habits-wrapper__item');
      DOMElements.userHabits.appendChild(newHabit);
    })

  }

  public bindAddHabitClick = (): void => {
    DOMElements.addHabit.addEventListener('click', () => {
      DOMElements.modalHabit.classList.add('modal--active');
      DOMElements.habitsPage.classList.add('habits-page--disabled');
    })
  }
  public confirmHabitClick = (): void => {
    DOMElements.buttonHabitConfirm.addEventListener('click', () => {
      console.log('CONFIRM HABIT!');
      DOMElements.modalHabit.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    })
  }
  public closeHabitClick = (): void => {
    DOMElements.buttonHabitClose.addEventListener('click', (e) => {
      DOMElements.modalHabit.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    })
  }

  public bindSettingsClick = (): void => { // TODO naming wrong
    DOMElements.navigateToSettings.addEventListener('click', () => {
      DOMElements.modalSettings.classList.add('modal--active');
      DOMElements.habitsPage.classList.add('habits-page--disabled');

    })
  }
  public confirmSettingsClick = (): void => {
    DOMElements.buttonSettingsConfirm.addEventListener('click', () => {
      console.log('CONFIRM HABIT!');
      DOMElements.modalSettings.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    })
  }
  public closeSettingsClick = (): void => {
    DOMElements.buttonSettingsClose.addEventListener('click', (e) => {
      DOMElements.modalSettings.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    })
  }

  public bindNavigateLogOutClick = (handler: any): void => {
    DOMElements.navigateToLogOut.addEventListener('click', () => {
      handler();
    })
  }

}