import { AnyAction } from 'redux';
import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
	startLoading,
} from './user.action';
import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

const userReducer = (
	state = USER_INITIAL_STATE,
	action: AnyAction
): UserState => {
	if (signInSuccess.match(action)) {
		return { currentUser: action.payload, isLoading: false, error: null };
	} else if (startLoading.match(action)) {
		return { ...state, isLoading: true };
	} else if (signOutSuccess.match(action)) {
		return { currentUser: null, isLoading: false, error: null };
	} else if (
		signInFailed.match(action) ||
		signOutFailed.match(action) ||
		signUpFailed.match(action)
	) {
		return { ...state, isLoading: false, error: action.payload };
	} else {
		return state;
	}
};

export default userReducer;
