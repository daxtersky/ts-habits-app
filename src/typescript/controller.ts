import { View } from './view';
import { Model } from './model';
import { AuthConfig } from './types';
// import firebase from 'firebase'; // TODO my function works
import firebase from 'firebase/app'; // TODO proper
import 'firebase/functions'; // If using Firebase database
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage

document.addEventListener('DOMContentLoaded', (): Controller => {
  return new Controller(new View(), new Model());
});

class Controller {
  constructor(public view: View, public model: Model) {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAekSW2R8QuGPeiQret4T7zAgBYoBNGWcg",
      authDomain: "habits-cloud-functions-9dccc.firebaseapp.com",
      databaseURL: "https://habits-cloud-functions-9dccc.firebaseio.com",
      projectId: "habits-cloud-functions-9dccc",
      storageBucket: "habits-cloud-functions-9dccc.appspot.com",
      messagingSenderId: "282926052128",
      appId: "1:282926052128:web:8044186b157d0f7952dd45"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // WELCOME PAGE
    this.view.bindNavigateToLoginModalClick();
    this.view.bindNavigateToRegisterModalClick();
    this.view.bindRegisterClick(this.handleRegister);
    this.view.bindLoginClick(this.handleLogin);
    // HABITS PAGE
    this.view.bindNavigateLogOutClick(this.handleLogout);
  }

  // WELCOME PAGE

  public bindRegisterResult = (isRegistered: boolean): void => {
    this.view.showRegisterResult(isRegistered);
    console.log('register click!', );
    const sayHello = firebase.functions().httpsCallable('sayHello');
    sayHello().then(result => {
      console.log('sayhello then', result);
      return result.data;
    })
  }
  public bindLoginResult = (isLogged: boolean): void => {
    this.view.showLoginResult(isLogged);
  }

  private handleRegister = (config: AuthConfig): void => {
    this.model.validateRegister(config);
    this.bindRegisterResult(this.model.isRegistered);
  }
  private handleLogin = (config: AuthConfig): void => {
    this.model.validateLogin(config);
    this.bindLoginResult(this.model.isLogged);
  }

  // HABITS PAGE
  public bindLogoutResult = (isLogged: boolean): void => {
    this.view.showLogoutResult(isLogged)
  }

  private handleLogout = (): void => {
    this.model.onLogout();
    this.bindLogoutResult(this.model.isLogged)
  }

}
