import { ColorTheme, HabitType } from './enums';
import { Habit } from './types';

export class Model {
  private getDefaultColor = (habitType: HabitType): string => {
    switch (habitType) {
      case HabitType.Day: return 'green';
      case HabitType.Week: return 'pink';
      case HabitType.Month: return 'blue';
      case HabitType.Year: return 'yellow';
    }
  }
  private habits: Habit[] = [];

  constructor() {
    console.log('habits 1', this.habits);
  }

  public showInModel = (data: string): void => {
    this.habits = [{
      id: 1,
      name: 'Brush your teeth',
      order: 1,
      habitType: HabitType.Day,
      description: 'Brush your teeth twice everyday!',
      activiTyActual: 0,
      activiTyGoal: 2,
      habitColor: this.getDefaultColor(HabitType.Day),
      // optional... in part 2
      // activityFinished?: Date; // ??
      positiveHabit: true,
      habitCreated: new Date(),
    }, {
      id: 2,
      name: 'Talk to a stranger',
      order: 2,
      habitType: HabitType.Week,
      description: 'Meet new people!',
      activiTyActual: 0,
      activiTyGoal: 1,
      habitColor: this.getDefaultColor(HabitType.Week),
      // optional... in part 2
      // activityFinished?: Date; // ??
      positiveHabit: true,
      habitCreated: new Date(),
    }]
    console.log('habits', this.habits);
    console.log('data', data);
  }


}