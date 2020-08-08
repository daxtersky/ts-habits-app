import { View } from './view';
import { Model } from './model';
import { AuthConfig } from './types';

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    this.view.bindRegisterClick(this.handleRegister);
    this.view.bindLoginClick(this.handleLogin);
  }

  public handleValidation = isRegistered => {
    this.view.validationCheck(isRegistered);
  }

  private handleRegister = (data: AuthConfig): void => {
    this.model.registerEvent(data);
    this.handleValidation(this.model.isRegistered);
  }
  private handleLogin = (data: AuthConfig): void => {
    this.model.loginEvent(data);
  }

}
