import { HabitType } from './enums';
import { FirebaseConfig, UserState, Habit, AuthConfig, UserStateCallback, ErrorMessageCallback, HabitsCallback } from './types';

import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
// import 'firebase/database'; // If using Firebase database
// import 'firebase/storage'; // If using Firebase storage

export class Model {
  private habits: Partial<Habit>[];
  private firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyAekSW2R8QuGPeiQret4T7zAgBYoBNGWcg",
    authDomain: "habits-cloud-functions-9dccc.firebaseapp.com",
    databaseURL: "https://habits-cloud-functions-9dccc.firebaseio.com",
    projectId: "habits-cloud-functions-9dccc",
    storageBucket: "habits-cloud-functions-9dccc.appspot.com",
    messagingSenderId: "282926052128",
    appId: "1:282926052128:web:8044186b157d0f7952dd45"
  };
  protected userState: UserState = {
    errorMessage: '',
    isLogged: false,
  }
  // REGISTER
  private handleRegisterError: ErrorMessageCallback;
  // LOGIN
  private handleLoginError: ErrorMessageCallback;
  // LOGIN STATE CHANGE (FIREBASE AUTH)
  private userAuthStateNotLogged: UserStateCallback;
  private userAuthStateLogged: UserStateCallback;
  // NEW HABIT
  private onHabitsChange: HabitsCallback;
  // SETTINGS
  // NAVIGATE

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
    firebase.auth().onAuthStateChanged(user => this.userAuthStateChanged(user));
  }

  // REGISTER
  public onRegisterUser = (config: AuthConfig): void => {
    firebase.auth()
      .createUserWithEmailAndPassword(config.email, config.password)
      .then(() => this.setUsername(config))
      .catch((err) => {
        this.userState = { ...this.userState, errorMessage: err.message };
        this.handleRegisterError(this.userState.errorMessage);
      })
  }
  public bindRegisterError = (callback: ErrorMessageCallback): ErrorMessageCallback => this.handleRegisterError = callback;
  // LOGIN
  public onLoginUser = (config: AuthConfig): void => {
    firebase.auth()
      .signInWithEmailAndPassword(config.email, config.password)
      .catch((err) => {
        this.userState = { ...this.userState, errorMessage: err.message };
        this.handleLoginError(this.userState.errorMessage);
      })
  }
  public bindLoginError = (callback: ErrorMessageCallback): ErrorMessageCallback => this.handleLoginError = callback;
  // LOGIN STATE CHANGE (FIREBASE AUTH)
  private userAuthStateChanged(user: firebase.User): void {
    if (user) {
      this.userState = { ...this.userState, isLogged: true };
      this.userAuthStateLogged(this.userState);
      this.readHabits();
      console.log('logged!', this.userState);
    } else {
      this.userState = { ...this.userState, isLogged: false };
      this.userAuthStateNotLogged(this.userState);
      console.log('not logged!', this.userState);
    }
  }
  public bindUserAuthStateNotLogged = (callback: UserStateCallback): UserStateCallback => this.userAuthStateNotLogged = callback;
  public bindUserAuthStateLogged = (callback: UserStateCallback): UserStateCallback => this.userAuthStateLogged = callback;
  // NEW HABIT
  public onHabitAdd = (habit: Partial<Habit>): void => {
    const newHabit = {
      ...habit,
      id: this.getNewUniqueId(),
    }
    this.habits.push(newHabit);
    this.onHabitsChange(this.habits);
  }
  public bindHabitsChange = (callback: HabitsCallback): HabitsCallback => this.onHabitsChange = callback;
  // NAVIGATE
  public onLogoutUser = (): void => {
    firebase.auth().signOut();
  }
  // HELPER FUNCTIONS
  private getDefaultColor = (habitType: HabitType): string => {
    switch (habitType) {
      case HabitType.Day: return 'green';
      case HabitType.Week: return 'pink';
      case HabitType.Month: return 'blue';
      case HabitType.Year: return 'yellow';
    }
  }
  private setUsername = (config: AuthConfig): string => this.userState.username = config.username ? config.username : config.email;
  private getNewUniqueId = (): number => {
    const usedIds: number[] = [];
    const newNumber = this.getNewNumber();
    this.habits.forEach(habit => usedIds.push(habit.id));
    return usedIds.includes(newNumber)
      ? this.getNewUniqueId()
      : newNumber;
  }
  private getNewNumber = (): number => Math.floor((Math.random() * 999) + 1);
  private readHabits() {
    this.habits = [
      { id: 1, name: 'Brush your teeth', order: 1, habitType: HabitType.Day, description: 'Brush your teeth twice everyday!', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 2, name: 'Train yoga for min. 20 minutes', order: 2, habitType: HabitType.Day, description: 'Yoga description', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 3, name: 'Drink min. 2 litres of water', order: 3, habitType: HabitType.Day, description: 'Water description', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 4, name: 'Junk food eaten', order: 4, habitType: HabitType.Month, description: 'Junk food description', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 5, name: 'Sleep for at least 7 hours', order: 5, habitType: HabitType.Day, description: 'Sleep description', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 6, name: 'Read book for min. 30 minutes', order: 6, habitType: HabitType.Day, description: 'Read description', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 7, name: 'Find 3 things you are proud of yourself', order: 7, habitType: HabitType.Day, description: 'Proud description', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 8, name: 'Call someone close to you', order: 8, habitType: HabitType.Day, description: 'Call description', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 9, name: 'Talk to a stranger', order: 9, habitType: HabitType.Week, description: 'Meet new people!', activiTyActual: 0, activiTyGoal: 1, habitColor: this.getDefaultColor(HabitType.Week) }
    ]
    this.onHabitsChange(this.habits);
    console.log('HABITS', this.habits);
  }

  // ** hideForLater...
  hideForLater = {
    /* public onHandleCallableFunction = (config: AuthConfig, functions: firebase.functions.Functions) => {
      console.log('register click!', config);
      const sayHello = functions.httpsCallable('sayHello');
      sayHello(config).then(result => {
        console.log('sayHello res', config);
        return result;
      })
    } */
  }

}