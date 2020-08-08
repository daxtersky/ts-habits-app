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

  public validateRegister = (data: AuthConfig): void => {
    this.isRegistered = this.getRegisterResult(data);
    if (this.isRegistered) {
      console.log('registered!');
    }
  }

  private getRegisterResult = (config: AuthConfig) => {
    if (config.email === '' || config.password === '' || config.username === '') {
      return false;
    }
    return true;
  }

  // private validateLogin = (config: AuthConfig) => {
  //   console.log('validateLogin', config);
  //   if (config.email === '' || config.password === '') {
  //     return false;
  //   }
  //   return true;
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