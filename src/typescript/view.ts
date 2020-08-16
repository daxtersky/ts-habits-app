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
  get habitName() { return DOMElements.inputHabitName.value }
  set habitName(newValue: string) { DOMElements.inputHabitName.value = newValue }

  constructor() {
    document.addEventListener('click', e => e.preventDefault());
    DOMElements.inputRegisterEmail.select();
  }

  // REGISTER
  public listenerRegisterClick = (handler: (config: AuthConfig) => void): void => {
    DOMElements.buttonToRegister.addEventListener('click', () => {
      this.showSpinner();
      handler({
        email: this.userRegisterMail,
        password: this.userRegisterPassword,
        username: this.userRegisterUsername
      })
    })
  }
  public navigateToRegisterModalClick = (): void => {
    DOMElements.navigateToRegister.addEventListener('click', () => {
      DOMElements.modalRegister.classList.add('modal--active');
      DOMElements.modalLogin.classList.remove('modal--active');
    })
  }
  public displayRegisterState = (errorMessage: string): void => {
    DOMElements.registerErrorMessage.innerText = errorMessage;
  }

  // LOGIN
  public listenerLoginClick = (handler: (config: AuthConfig) => void): void => {
    DOMElements.buttonToLogin.addEventListener('click', () => {
      this.showSpinner();
      handler({
        email: this.userLoginMail,
        password: this.userLoginPassword
      })
      DOMElements.modalRegister.classList.remove('modal--active');
      DOMElements.modalLogin.classList.add('modal--active');
    })
  }
  public navigateToLoginModalClick = (): void => {
    DOMElements.navigateToLogin.addEventListener('click', () => {
      DOMElements.modalRegister.classList.remove('modal--active');
      DOMElements.modalLogin.classList.add('modal--active');
    })
  }
  public displayLoginState = (errorMessage: string): void => {
    DOMElements.loginErrorMessage.innerText = errorMessage;
  }
  public navigateToLoginPage = (): void => {
    DOMElements.welcomePage.classList.add('welcome-page--active')
    DOMElements.habitsPage.classList.remove('habits-page--active');
    DOMElements.modalLogin.classList.add('modal--active');
  }

  // HABITS PAGE
  public navigateToHabitsPage = (username: string): void => {
    DOMElements.welcomePage.classList.remove('welcome-page--active')
    DOMElements.habitsPage.classList.add('habits-page--active');
    DOMElements.modalRegister.classList.remove('modal--active');
    DOMElements.modalLogin.classList.remove('modal--active');
    DOMElements.username.innerText = username;
  }
  public navigateToLogoutClick = (handler: any): void => {
    DOMElements.navigateToLogOut.addEventListener('click', () => {
      this.showSpinner();
      handler();
    })
  }

  // HABITS PAGE - HABITS
  public displayHabits = (habits: Partial<Habit>[]): void => {
    while (DOMElements.userHabits.hasChildNodes()) {
      DOMElements.userHabits.removeChild(DOMElements.userHabits.lastChild);
    }
    habits.forEach(habit => {
      const newHabit = document.createElement('li');
      newHabit.innerText = habit.name;
      newHabit.classList.add('habits-wrapper__item');
      DOMElements.userHabits.appendChild(newHabit);
    })
  }

  // HABITS PAGE - MODALS
  public navigateToHabitModalClick = (): void => {
    DOMElements.buttonToHabitModal.addEventListener('click', () => {
      DOMElements.modalHabit.classList.add('modal--active');
      DOMElements.habitsPage.classList.add('habits-page--disabled');
      DOMElements.inputHabitName.select();
    })
  }
  public listenerConfirmHabitModalClick = (handler: (habit: Partial<Habit>) => void): void => {
    DOMElements.buttonToHabitConfirm.addEventListener('click', () => {
      handler({
        name: this.habitName,
        //
      });
      DOMElements.modalHabit.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
      this.habitName = null;
    })
  }
  public navigateToSettingsModalClick = (): void => {
    DOMElements.navigateToSettings.addEventListener('click', () => {
      DOMElements.modalSettings.classList.add('modal--active');
      DOMElements.habitsPage.classList.add('habits-page--disabled');
    })
  }
  public listenerConfirmSettingsModalClick = (): void => {
    DOMElements.buttonToSettingsConfirm.addEventListener('click', () => {
      console.log('CONFIRM SETTINGS!');
      DOMElements.modalSettings.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    })
  }
  public navigateToCloseModalClick = (): void => {
    DOMElements.buttonToModalClose.forEach(button => button.addEventListener('click', e => {
      (e.target as HTMLElement).classList.contains('button--close-habit') // else 'button--close-settings'
        ? DOMElements.modalHabit.classList.remove('modal--active')
        : DOMElements.modalSettings.classList.remove('modal--active');
      DOMElements.habitsPage.classList.remove('habits-page--disabled');
    }));
  }

  // SPINNER
  public showSpinner = () => DOMElements.spinner.classList.add('spinner--active');
  public hideSpinner = () => DOMElements.spinner.classList.remove('spinner--active');

}