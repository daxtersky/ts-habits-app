import { View } from './view';
import { Model } from './model';
import { AuthConfig, UserState, Habit } from './types';

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    // SPINNER
    this.view.showSpinner();
    // REGISTER
    this.view.listenerRegisterClick(this.bindRegisterProcess);
    this.model.bindRegisterError(this.onRegisterError);
    // LOGIN
    this.view.listenerLoginClick(this.bindLoginProcess);
    this.model.bindLoginError(this.onLoginError);
    // LOGIN STATE CHANGE (FIREBASE AUTH)
    this.model.bindUserAuthStateNotLogged(this.onUserNotLogged);
    this.model.bindUserAuthStateLogged(this.onUserLogged);
    // NEW HABIT
    this.view.listenerConfirmHabitModalClick(this.bindHabitAdd);
    this.model.bindHabitsChange(this.onHabitsChanged); // TODO
    // SETTINGS
    this.view.listenerConfirmSettingsModalClick();
    // this.model.bind....
    // NAVIGATE
    this.view.navigateToRegisterModalClick();
    this.view.navigateToLoginModalClick();
    // this.view.navigateToHabitModalClick(); // TODO
    this.view.navigateToSettingsModalClick();
    this.view.navigateToCloseModalClick();
    this.view.navigateToLogoutClick(this.handleLogout);
  }

  // REGISTER
  private bindRegisterProcess = (config: AuthConfig): void => this.model.onRegisterUser(config);
  private onRegisterError = (errorMessage: string): void => {
    this.view.hideSpinner();
    this.view.displayRegisterState(errorMessage);
  }
  // LOGIN
  private bindLoginProcess = (config: AuthConfig): void => this.model.onLoginUser(config);
  private onLoginError = (errorMessage: string): void => {
    this.view.hideSpinner();
    this.view.displayLoginState(errorMessage);
  }
  // LOGIN STATE CHANGE (FIREBASE AUTH)
  private onUserNotLogged = (): void => {
    setTimeout(() => {
      this.view.hideSpinner();
      this.view.navigateToLoginPage();
    }, 800);
  }
  private onUserLogged = (userState: UserState): void => {
    this.view.hideSpinner();
    this.view.navigateToHabitsPage(userState.username);
  }
  // NEW HABIT
  private bindHabitAdd = (habit: Partial<Habit>): void => this.model.onHabitAdd(habit);
  private onHabitsChanged = (habits: Partial<Habit>[]): void => {
    console.log('onHabitsChanged', habits);
    this.view.displayHabits(habits);
  }
  // SETTINGS
  // ...
  // NAVIGATE
  private handleLogout = (): void => this.model.onLogoutUser();
  // ...
}
