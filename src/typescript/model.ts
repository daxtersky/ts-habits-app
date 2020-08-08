import { ColorTheme, HabitType } from './enums';
import { AuthConfig, Habit } from './types';

export class Model {
  private habits: Habit[] = [];
  isRegistered = false;
  isLogged = false;

  constructor() {
    this.habits = [
      { id: 1, name: 'Brush your teeth', order: 1, habitType: HabitType.Day, description: 'Brush your teeth twice everyday!', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day) },
      { id: 2, name: 'Talk to a stranger', order: 2, habitType: HabitType.Week, description: 'Meet new people!', activiTyActual: 0, activiTyGoal: 1, habitColor: this.getDefaultColor(HabitType.Week) },
    ];
    // console.log('default habits', this.habits);
  }

  handleValidation(callback) {
    this.isRegistered = callback;
  }

  public registerEvent = (data: AuthConfig): void => {
    if (this.validateRegister(data)) {
      this.isRegistered = true;
    } else {
      this.isRegistered = false;
    }
  }
  public loginEvent = (data: AuthConfig): void => {
    if (this.validateLogin(data)) {
      this.isLogged = true;
      console.log('logged!');
    } else {
      this.isLogged = false;
      console.log('login error!');
    }
  }

  private validateRegister = (config: AuthConfig) => {
    console.log('validateRegister', config);
    if (config.email === '' || config.password === '' || config.username === '') {
      return false;
    }
    return true;
  }

  private validateLogin = (config: AuthConfig) => {
    console.log('validateLogin', config);
    if (config.email === '' || config.password === '') {
      return false;
    }
    return true;
  }

  private getDefaultColor = (habitType: HabitType): string => {
    switch (habitType) {
      case HabitType.Day: return 'green';
      case HabitType.Week: return 'pink';
      case HabitType.Month: return 'blue';
      case HabitType.Year: return 'yellow';
    }
  }

}