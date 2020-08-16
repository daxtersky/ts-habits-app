import { View } from './view';
import { Model } from './model';
import { AuthConfig, UserState, Habit } from './types';

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {

    // WELCOME PAGE
    this.model.bindLoginError(this.onLoginError);
    this.model.bindRegisterError(this.onRegisterError);
    this.model.bindUserAuthStateNotLogged(this.onUserNotLogged);
    this.model.bindUserAuthStateLogged(this.onUserLogged);
    this.view.navigateToLoginModalClick();
    this.view.navigateToRegisterModalClick();
    this.view.listenerRegisterClick(this.bindRegisterProcess);
    this.view.listenerLoginClick(this.bindLoginProcess);

    // NEW HABIT
    this.view.navigateToHabitModalClick();
    this.model.bindHabitAdd(this.onHabitAdded);
    this.view.listenerConfirmHabitModalClick(this.bindHabitAdd);

    this.model.bindHabitsChange(this.onHabitsChanged);
    this.view.navigateToHabitModalClick();
    this.view.navigateToSettingsModalClick();
    this.view.listenerOkSettingsModalClick();
    this.view.navigateToCloseModalClick();
    this.view.navigateToLogoutClick(this.handleLogout);
  }

  private onRegisterError = (errorMessage: string): void => {
    this.view.hideSpinner();
    this.view.displayRegisterState(errorMessage);
  }
  private onLoginError = (errorMessage: string): void => {
    this.view.hideSpinner();
    this.view.displayLoginState(errorMessage);
  }
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
  private bindRegisterProcess = (config: AuthConfig): void => this.model.onRegisterUser(config);
  private bindLoginProcess = (config: AuthConfig): void => this.model.onLoginUser(config);

  // NEW HABIT
  private bindHabitAdd = (habit: Partial<Habit>): void => this.model.onHabitAdd(habit);
  private onHabitAdded = (habit: Partial<Habit>): void => {
    console.log('CONTROLLER', habit);
    // setTimeout(() => {
      // this.view.hideSpinner();
      this.view.displayHabit(habit);
    // }, 800);
  };
  //
  private onHabitsChanged = (habits: Partial<Habit>[]): void => {
  console.log('3 onHabitsChanged', habits);
    this.view.displayHabits(habits);
  }
  private handleLogout = (): void => this.model.onLogoutUser();

}
