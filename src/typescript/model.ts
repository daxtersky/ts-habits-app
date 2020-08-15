import { HabitType } from './enums';
import { FirebaseConfig, UserState, Habit, AuthConfig, UserStateCallback, ErrorMessageCallback } from './types';

import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
// import 'firebase/database'; // If using Firebase database
// import 'firebase/storage'; // If using Firebase storage

export class Model {
  private habits: Habit[];
  isRegistered = false;
  isLogged = false;
  firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyAekSW2R8QuGPeiQret4T7zAgBYoBNGWcg",
    authDomain: "habits-cloud-functions-9dccc.firebaseapp.com",
    databaseURL: "https://habits-cloud-functions-9dccc.firebaseio.com",
    projectId: "habits-cloud-functions-9dccc",
    storageBucket: "habits-cloud-functions-9dccc.appspot.com",
    messagingSenderId: "282926052128",
    appId: "1:282926052128:web:8044186b157d0f7952dd45"
  };
  userState: UserState = {
    errorMessage: '',
    isLogged: false,
  }
  handleRegisterError: ErrorMessageCallback;
  handleLoginError: ErrorMessageCallback;
  userAuthStateNotLogged: UserStateCallback;
  userAuthStateLogged: UserStateCallback;

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
    firebase.auth().onAuthStateChanged(user => this.userAuthStateChanged(user));
  }

  public bindRegisterError = (callback: ErrorMessageCallback): ErrorMessageCallback => this.handleRegisterError = callback;
  public bindLoginError = (callback: ErrorMessageCallback): ErrorMessageCallback => this.handleLoginError = callback;
  public bindUserAuthStateNotLogged = (callback: UserStateCallback): UserStateCallback => this.userAuthStateNotLogged = callback;
  public bindUserAuthStateLogged = (callback: UserStateCallback): UserStateCallback => this.userAuthStateLogged = callback;

  public onRegisterUser = (config: AuthConfig): void => {
    firebase.auth()
      .createUserWithEmailAndPassword(config.email, config.password)
      .then(() => this.setUsername(config))
      .catch((err) => {
  this.userState = { ...this.userState, errorMessage: err.message };
  this.handleRegisterError(this.userState.errorMessage);
})
  }
  public onLoginUser = (config: AuthConfig): void => {
  firebase.auth()
    .signInWithEmailAndPassword(config.email, config.password)
    .catch((err) => {
      this.userState = { ...this.userState, errorMessage: err.message };
      this.handleLoginError(this.userState.errorMessage);
    })
}
  public onLogoutUser = (): void => {
  firebase.auth().signOut();
}

  private userAuthStateChanged(user: firebase.User): void {
  if(user) {
    this.userState = { ...this.userState, isLogged: true };
    this.userAuthStateLogged(this.userState);
    console.log('logged!', this.userState);
  } else {
    this.userState = { ...this.userState, isLogged: false };
    this.userAuthStateNotLogged(this.userState);
    console.log('not logged!', this.userState);
  }
}

private setUsername = (config: AuthConfig): string => this.userState.username = config.username ? config.username : config.email

////////////////////

  /* public onHandleCallableFunction = (config: AuthConfig, functions: firebase.functions.Functions) => {
       console.log('register click!', config);
       const sayHello = functions.httpsCallable('sayHello');
       sayHello(config).then(result => {
         console.log('sayHello res', config);
         return result;
       })
  } */

  private getDefaultColor = (habitType: HabitType): string => {
  switch (habitType) {
    case HabitType.Day: return 'green';
    case HabitType.Week: return 'pink';
    case HabitType.Month: return 'blue';
    case HabitType.Year: return 'yellow';
  }
}

}