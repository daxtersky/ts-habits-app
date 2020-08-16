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

    // HABITS PAGE
    this.model.bindHabitsChange(this.onHabitsChanged);
    this.view.navigateToHabitModalClick();
    this.view.navigateAfterOkHabitModalClick();
    this.view.navigateToSettingsModalClick();
    this.view.navigateAfterOkSettingsModalClick();
    this.view.navigateToCloseModalClick();
    this.view.navigateToLogoutClick(this.handleLogout);
  }

  // WELCOME PAGE
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

  // HABITS PAGE
  private onHabitsChanged = (habits: Habit[]): void => this.view.displayHabits(habits);
  private handleLogout = (): void => this.model.onLogoutUser();

}
