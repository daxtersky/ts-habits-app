import { View } from './view';
import { Model } from './model';
import { AuthConfig, UserState, Habit } from './types';

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    // AUTH - REGISTER
    this.view.listenerRegisterClick(this.bindRegisterProcess);
    this.model.bindRegisterError(this.onRegisterError);
    // AUTH - LOGIN
    this.view.listenerLoginClick(this.bindLoginProcess);
    this.model.bindLoginError(this.onLoginError);
    // AUTH - LOGIN STATE CHANGE (FIREBASE AUTH)
    this.model.bindUserAuthStateNotLogged(this.onUserNotLogged);
    this.model.bindUserAuthStateLogged(this.onUserLogged);
    // AUTH - NAVIGATION
    this.view.showSpinner();
    this.view.navigateToRegisterModalClick();
    this.view.navigateToLoginModalClick();
    this.view.navigateToCloseModalClick();
    this.view.navigateToLogoutClick(this.handleLogout);
    // HABITS
    //
    this.model.bindHabitsChange(this.onHabitsChanged);
    //
    this.view.listenerOpenHabitModalClick(this.bindHabitREAD);
    this.view.listenerConfirmHabitChangeClick(this.bindHabitChange);
    // this.model.bind.........
    // SETTINGS MODAL
    this.view.navigateToSettingsModalClick();
    this.view.listenerConfirmSettingsModalClick();
    // this.model.bind....
  }

  // AUTH - REGISTER
  private bindRegisterProcess = (config: AuthConfig): void => this.model.onRegisterUser(config);
  private onRegisterError = (errorMessage: string): void => {
    this.view.hideSpinner();
    this.view.displayRegisterState(errorMessage);
  }
  // AUTH - LOGIN
  private bindLoginProcess = (config: AuthConfig): void => this.model.onLoginUser(config);
  private onLoginError = (errorMessage: string): void => {
    this.view.hideSpinner();
    this.view.displayLoginState(errorMessage);
  }
  // AUTH - LOGIN STATE CHANGE (FIREBASE AUTH)
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
  // AUTH - NAVIGATION
  private handleLogout = (): void => this.model.onLogoutUser();
  // HABITS
  private onHabitsChanged = (habits: Partial<Habit>[]): void => this.view.displayHabits(habits);
  //
  private bindHabitREAD = (habitId: number) => {
    console.log('habitid!', habitId);
    // this.view.displayHabit(habitId);
  }
  private bindHabitChange = (habit: Partial<Habit>): void => this.model.onHabitChange(habit);
  // SETTINGS MODAL
  // ...
}
