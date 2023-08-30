import USER_ACTION_TYPES from './user.types';

import {
	Action,
	ActionWithPayLoad,
	createAction,
	withMatcher,
} from '../../utils/reducer/reducer.utils';

import {
	AdditionalInformation,
	UserData,
} from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type StartLoading = Action<USER_ACTION_TYPES.START_LOADING>;

export type EmailSignInStart = ActionWithPayLoad<
	USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;
export type SignInSuccess = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	UserData
>;
export type SignUpStart = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_UP_START,
	{ email: string; password: string; displayName: string }
>;
export type SignUpSuccess = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{ user: User; additionalDetails: AdditionalInformation }
>;
export type SignOutFailed = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_OUT_FAILED,
	Error
>;
export type SignInFailed = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_IN_FAILED,
	Error
>;
export type SignUpFailed = ActionWithPayLoad<
	USER_ACTION_TYPES.SIGN_UP_FAILED,
	Error
>;

export const checkUserSession = withMatcher((): CheckUserSession => {
	return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
});

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
	return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
});

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart => {
		return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
			email,
			password,
		});
	}
);

export const signInSuccess = withMatcher(
	(user: UserData & { id: string }): SignInSuccess => {
		return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
	}
);

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart => {
		return createAction(USER_ACTION_TYPES.SIGN_UP_START, {
			email,
			password,
			displayName,
		});
	}
);

export const signUpSuccess = withMatcher(
	(user: User, additionalDetails: AdditionalInformation): SignUpSuccess => {
		return createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
			user,
			additionalDetails,
		});
	}
);

export const signOutStart = withMatcher((): SignOutStart => {
	return createAction(USER_ACTION_TYPES.SIGN_OUT_START);
});

export const signOutSuccess = withMatcher((): SignOutSuccess => {
	return createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
});

export const signOutFailed = withMatcher((error: Error): SignOutFailed => {
	return createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
});

export const signInFailed = withMatcher((error: Error): SignInFailed => {
	return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
});

export const signUpFailed = withMatcher((error: Error): SignUpFailed => {
	return createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
});

export const startLoading = withMatcher((): StartLoading => {
	return createAction(USER_ACTION_TYPES.START_LOADING);
});
