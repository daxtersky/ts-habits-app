import { View } from './view';
import { Model } from './model';
import { AuthConfig, UserState } from './types';

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    this.model.bindLoginError(this.onLoginError);
    this.model.bindRegisterError(this.onRegisterError);
    this.model.bindUserAuthStateNotLogged(this.onUserNotLogged);
    this.model.bindUserAuthStateLogged(this.onUserLogged);

    this.view.listenerRegisterClick(this.bindRegisterProcess);
    this.view.listenerLoginClick(this.bindLoginProcess);
    this.view.bindNavigateToLoginModalClick();
    this.view.bindNavigateToRegisterModalClick();
    this.view.bindNavigateLogOutClick(this.handleLogout);
  }
  private onRegisterError = (errorMessage: string): void => this.view.displayRegisterUserState(errorMessage);
  private onLoginError = (errorMessage: string): void => this.view.displayUserState(errorMessage);
  private onUserNotLogged = (): void => this.view.navigateToLoginPage();
  private onUserLogged = (userState: UserState): void => {
    console.log(userState);
    this.view.navigateToHabitsPage(userState.username);
  }

  private bindRegisterProcess = (config: AuthConfig): void => this.model.onRegisterUser(config);
  private bindLoginProcess = (config: AuthConfig): void => this.model.onLoginUser(config);

  private handleLogout = (): void => this.model.onLogoutUser();

}
