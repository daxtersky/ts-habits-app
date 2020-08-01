import { ColorTheme, HabitType } from './enums';
import { Habit } from './types';

export class Model {
  private habits: Habit[] = [];

  constructor() {
    this.habits = [
      { id: 1, name: 'Brush your teeth', order: 1, habitType: HabitType.Day, description: 'Brush your teeth twice everyday!', activiTyActual: 0, activiTyGoal: 2, habitColor: this.getDefaultColor(HabitType.Day), },
      { id: 2, name: 'Talk to a stranger', order: 2, habitType: HabitType.Week, description: 'Meet new people!', activiTyActual: 0, activiTyGoal: 1, habitColor: this.getDefaultColor(HabitType.Week)
    }];
    console.log('default habits', this.habits);
  }

  private getDefaultColor = (habitType: HabitType): string => {
    switch (habitType) {
      case HabitType.Day: return 'green';
      case HabitType.Week: return 'pink';
      case HabitType.Month: return 'blue';
      case HabitType.Year: return 'yellow';
    }
  }

  //// App functions
  // 1. Log in
  // 2. Registration
  // 3. Log out
  // 4. Detele account
  // 5. "Upgrade" account*
  // 6. Add habit
  // 7. Update habit
  // 8. Delete habit
  // 9. Change settings
  // 10.

  public listenButtonClick = (data: string): void => {
    console.log('btn model.ts', data);
  }

}