import { HabitType } from './enums';
import { FirebaseConfig, UserState, Habit, AuthConfig, UserStateCallback } from './types';

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
  };
  handleLoginAuthChanged: (userState: UserState) => any;
  handleRegisterAuthChanged: (userState: UserState) => any;

  // constructor() {
    //
  // }

  public bindRegisterAuthChanged(callback: UserStateCallback) {
    this.handleRegisterAuthChanged = callback;
  }
  public bindLoginAuthChanged(callback: UserStateCallback) {
    this.handleLoginAuthChanged = callback;
  }
  // WELCOME PAGE

  public updateUserLoginState = (user: firebase.User): UserState => user
    ? this.userState = { ...this.userState, isLogged: true }
    : this.userState = { ...this.userState, isLogged: false }

  public onRegisterUser = (config: AuthConfig, fAuth: firebase.auth.Auth): void => {
    fAuth.createUserWithEmailAndPassword(config.email, config.password)
      .catch((err) => {
        this.userState = { ...this.userState, errorMessage: err.message };
        this.handleRegisterAuthChanged(this.userState);
      })
  }

  public onLoginUser = (config: AuthConfig, fAuth: firebase.auth.Auth): void => {
    fAuth.signInWithEmailAndPassword(config.email, config.password)
      .catch((err) => {
        this.userState = { ...this.userState, errorMessage: err.message };
        this.handleLoginAuthChanged(this.userState);
      })
  }

  // HABITS PAGE
  public onLogoutUser = (fAuth: firebase.auth.Auth): void => {
    fAuth.signOut()
      // .then(user => console.log('logout user', user))
      // .catch(err => console.log('logout err', err))
  };

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