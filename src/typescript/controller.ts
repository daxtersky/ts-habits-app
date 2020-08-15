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

    this.model.bindAuthProcessChanged(this.onAuthProcessChanged);
    this.model.bindAuthRegisterProcessChanged(this.onAuthRegisterProcessChanged);
    this.onAuthRegisterProcessChanged(this.model.userState);
    this.onAuthProcessChanged(this.model.userState);

    // WELCOME PAGE
    this.view.bindNavigateToLoginModalClick();
    this.view.bindNavigateToRegisterModalClick();
    this.view.listenerRegisterClick(this.bindRegisterProcess);
    this.view.listenerLoginClick(this.bindLoginProcess);

    // HABITS PAGE
    this.view.bindNavigateLogOutClick(this.handleLogout);

  }

  private onAuthRegisterProcessChanged = (userState: UserState) => {
    this.view.displayRegisterUserState(userState);
  }
  private onAuthProcessChanged = (userState: UserState) => {
    this.view.displayUserState(userState);
  }

  // WELCOME PAGE
  // public bindRegisterResult = (userState: UserState): void => {
  //   this.view.showRegisterResult(userState);
  // }

  private bindRegisterProcess = (config: AuthConfig): void => {
    this.model.onRegisterUser(config, firebase.auth());
    // this.bindRegisterResult(this.model.userState);
  }
  private bindLoginProcess = (config: AuthConfig): void => {
    this.model.onLoginUser(config, firebase.auth())
  }

  // HABITS PAGE
  private userAuthStateListener(user: firebase.User): void {
    this.model.updateUserLoginState(user);
    this.model.userState.isLogged
      ? this.view.navigateToHabitsPage()
      : this.view.navigateToLoginPage();
  }

  private handleLogout = (): void => this.model.onLogoutUser(firebase.auth());


}
