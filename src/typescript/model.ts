import { HabitType } from './enums';
import { FirebaseConfig, UserState, Habit, AuthConfig } from './types';

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
  userState: UserState;

  constructor() {
  }

  // WELCOME PAGE

  // public validateRegister = (config: AuthConfig): boolean =>
  // this.isRegistered = this.authValidator(config);
  public onRegisterUser = (config: AuthConfig, fAuth: firebase.auth.Auth) => {
    fAuth.createUserWithEmailAndPassword(config.email, config.password)
      .then((user) => {
        this.userState = {
          errorMessage: '',
          isLogged: true,
        }
      })
      .catch((err) => {
        this.userState = {
          errorMessage: err.message,
          isLogged: false,
        }
        console.log('1 err', this.userState);
      })
  }

  // public validateLogin = (config: AuthConfig): boolean =>
  // this.isLogged = this.authValidator(config);
  public onLoginUser = (config: AuthConfig, fAuth: firebase.auth.Auth) => {
    fAuth.signInWithEmailAndPassword(config.email, config.password)
      .then((user) => {
        this.userState = {
          isLogged: true,
          errorMessage: ''
        }
      })
      .catch((err) => {
        this.userState = {
          isLogged: false,
          errorMessage: err.message
        }
        console.log('1 err', this.userState);
      })
  }

  // HABITS PAGE
  public onLogoutUser = (fAuth) => {
    fAuth.signOut()
      .then(user => {
        console.log('logout user', user);
        // return this.isLogged = false;
      })
      .catch(err => console.log('logout err', err))
  };

  // public onHandleCallableFunction = (config: AuthConfig, functions: firebase.functions.Functions) => {
  //   console.log('register click!', config);
  //   const sayHello = functions.httpsCallable('sayHello');
  //   sayHello(config).then(result => {
  //     console.log('sayHello res', config);
  //     return result;
  //   })
  // }

  private getDefaultColor = (habitType: HabitType): string => {
    switch (habitType) {
      case HabitType.Day: return 'green';
      case HabitType.Week: return 'pink';
      case HabitType.Month: return 'blue';
      case HabitType.Year: return 'yellow';
    }
  }

}