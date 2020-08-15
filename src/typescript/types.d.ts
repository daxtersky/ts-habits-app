import * as enums from './enums'; // https://lukasbehal.com/2017-05-22-enums-in-declaration-files/

type ErrorMessageCallback = (errorMessage: string) => any;
type UserStateCallback = (userState: UserState) => any;
type HabitsCallback = (habits: Habit[]) => any;

interface FirebaseConfig {
	apiKey: string,
	authDomain: string,
	databaseURL: string,
	projectId: string,
	storageBucket: string,
	messagingSenderId: string,
	appId: string
}

interface AuthConfig {
	email: string,
	password: string,
	username?: string
}

interface UserState {
	username?: string;
	errorMessage: string,
	isLogged: boolean,
}

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
