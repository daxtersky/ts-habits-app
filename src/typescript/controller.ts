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
    this.view.listenerRegisterClick(this.bindRegisterProcess);
    this.view.listenerLoginClick(this.bindLoginProcess);
    this.view.bindNavigateToLoginClick();
    this.view.bindNavigateToRegisterClick();

    // HABITS PAGE
    this.model.bindHabitsChange(this.onHabitsChanged);
    this.view.bindNavigateLogOutClick(this.handleLogout);
    this.view.bindAddHabitClick();
    this.view.confirmHabitClick();
    this.view.closeHabitClick();
    this.view.bindSettingsClick();
    this.view.confirmSettingsClick();
    this.view.closeSettingsClick();
  }

  // WELCOME PAGE
  private onRegisterError = (errorMessage: string): void => this.view.displayRegisterUserState(errorMessage);
  private onLoginError = (errorMessage: string): void => this.view.displayUserState(errorMessage);
  private onUserNotLogged = (): void => this.view.navigateToLoginPage();
  private onUserLogged = (userState: UserState): void => this.view.navigateToHabitsPage(userState.username);
  private bindRegisterProcess = (config: AuthConfig): void => this.model.onRegisterUser(config);
  private bindLoginProcess = (config: AuthConfig): void => this.model.onLoginUser(config);

  // HABITS PAGE
  private onHabitsChanged = (habits: Habit[]): void => this.view.displayHabits(habits);
  private handleLogout = (): void => this.model.onLogoutUser();

}
