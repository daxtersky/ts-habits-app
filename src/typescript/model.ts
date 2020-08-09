import { HabitType } from './enums';
import { Habit, AuthConfig } from './types';

export class Model {
  private habits: Habit[] = [];
  isRegistered = false;
  isLogged = false;

  constructor() {
    this.habits = [
      { id: 1, name: 'Brush your teeth', order: 1, habitType: HabitType.Day, description: 'Brush your teeth twice everyday!', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day) },
      { id: 2, name: 'Talk to a stranger', order: 2, habitType: HabitType.Week, description: 'Meet new people!', activiTyActual: 0, activiTyGoal: 1, habitColor: this.getDefaultColor(HabitType.Week) },
    ];
  }

  // WELCOME PAGE

  public validateRegister = (config: AuthConfig): boolean => this.isRegistered = this.authValidator(config);

  public validateLogin = (config: AuthConfig): boolean => this.isLogged = this.authValidator(config);

  private authValidator = (config: AuthConfig): boolean => {
    const emailValidator = /\S+@\S+\.\S+/;
    const configInputs = Object.keys(config).map(key => config[key]);

    if (!emailValidator.test(configInputs[0])) { // email
      return false;
    }
    if (configInputs[1].length < 4 || configInputs[1].length > 12) { // password
      return false;
    }
    if (configInputs[2] && (configInputs[2].length < 4 || configInputs[2].length > 9)) { // username, only for registering
      return false;
    }
    return true;
  }

  // HABITS PAGE

  public onLogout = (): boolean => this.isLogged = false;

  private getDefaultColor = (habitType: HabitType): string => {
    switch (habitType) {
      case HabitType.Day: return 'green';
      case HabitType.Week: return 'pink';
      case HabitType.Month: return 'blue';
      case HabitType.Year: return 'yellow';
    }
  }

}