import * as enums from './enums'; // https://lukasbehal.com/2017-05-22-enums-in-declaration-files/

interface FirebaseConfig {
	apiKey: string,
	authDomain: string,
	databaseURL: string,
	projectId: string,
	storageBucket: string,
	messagingSenderId: string,
	appId: string
}

// type MyFunction = () => void;

interface AuthConfig {
	email: string,
	password: string,
	username?: string
}

interface UserState {
	errorMessage: string,
	isLogged: boolean,
}

type UserStateCallback = (userState: UserState) => any;

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
