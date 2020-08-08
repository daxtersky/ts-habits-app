import { View } from './view';
import { Model } from './model';
import { AuthConfig } from './types';

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    this.view.bindRegisterClick(this.handleRegister);
  }

  public bindRegisterResult = (isRegistered: boolean): void => {
    this.view.showRegisterResult(isRegistered);
  }

  private handleRegister = (config: AuthConfig): void => {
    this.model.validateRegister(config);
    this.bindRegisterResult(this.model.isRegistered);
  }

}
