import { View } from './view';
import { Model } from './model';
import { AuthConfig, UserState } from './types';

import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
// import 'firebase/database'; // If using Firebase database
// import 'firebase/storage'; // If using Firebase storage

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    // FIREBASE
    firebase.initializeApp(this.model.firebaseConfig);
    firebase.auth().onAuthStateChanged(user => this.userAuthStateListener(user))
    // WELCOME PAGE
    this.view.bindNavigateToLoginModalClick();
    this.view.bindNavigateToRegisterModalClick();
    this.view.bindRegisterClick(this.handleRegister);
    this.view.bindLoginClick(this.handleLogin);
    // HABITS PAGE
    this.view.bindNavigateLogOutClick(this.handleLogout);
  }


  // WELCOME PAGE
  public bindRegisterResult = (userState: UserState): void => {
    this.view.showRegisterResult(userState);
  }
  public bindLoginResult = (userState: UserState): void => {
    this.view.showLoginResult(userState);
  }

  private handleRegister = (config: AuthConfig): void => {
    // this.model.onHandleCallableFunction(config, firebase.functions());
    this.model.onRegisterUser(config, firebase.auth());
    this.bindRegisterResult(this.model.userState);
    console.log('2', this.model.userState);
  }
  private handleLogin = (config: AuthConfig): void => {
    this.model.onLoginUser(config, firebase.auth())
    this.bindLoginResult(this.model.userState);
    console.log('2', this.model.userState);
  }

  // HABITS PAGE
  // public bindLogoutResult = (isLogged: boolean): void => {
    // this.view.showLogoutResult(isLogged)
  // }

  private handleLogout = (): void => {
    this.model.onLogoutUser(firebase.auth())
    // this.bindLogoutResult(this.model.isLogged)
  }

  userAuthStateListener(user: firebase.User): void {
    if (user) {
      this.model.isLogged = true;
      this.view.navigateToHabitsPage();
    } else {
      this.model.isLogged = false;
      this.view.navigateToLoginPage();
    }
  }

}
