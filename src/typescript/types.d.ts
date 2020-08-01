import * as enums from './enums';
// https://lukasbehal.com/2017-05-22-enums-in-declaration-files/

type MyFunction = () => void;

interface Habit {
  id: number;
	name: string;
	order: number // ???
	habitType: enums.HabitType; // frequency
	description: string;
  activiTyActual: number;
	activiTyGoal: number;
  habitColor: string;
  // getColor(enums.HabitType): string; // https://www.youtube.com/watch?v=VbW6vWTaHOY
	// optional... in part 2
	activityFinished?: Date; // ??
	positiveHabit?: boolean;
	habitCreated?: Date;
	habitFinished?: Date; // activity + activity = goal
}

interface User {
	islogged: boolean;
  login(): Function;
  logout(): Function;
	email: string;
	// defaultColors: array[];
	colorTheme: enums.ColorTheme;
	userName: string;
	showDayQuote: boolean;
	paidUser: boolean;
	// passwordChahnge?
	// actualHabits: Habit[]; ????
	// pastHabits: ???
}
