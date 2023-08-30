import { takeLatest, put, all, call } from 'typed-redux-saga/macro';

import USER_ACTION_TYPES from './user.types';

import {
	signInSuccess,
	signInFailed,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailed,
	startLoading,
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess,
} from './user.action';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
	AdditionalInformation,
} from '../../utils/firebase/firebase.utils';

import { User } from 'firebase/auth';

export function* signOut() {
	try {
		yield* put(startLoading());
		yield* call(signOutUser);
		yield* put(signOutSuccess());
	} catch (err) {
		yield* put(signOutFailed(err as Error));
	}
}

export function* signUp({
	payload: { email, password, displayName },
}: SignUpStart) {
	try {
		yield* put(startLoading());
		const userCredential = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);

		if (userCredential) {
			const { user } = userCredential;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (err) {
		yield* put(signUpFailed(err as Error));
	}
}

export function* signInAfterSignUp({
	payload: { user, additionalDetails },
}: SignUpSuccess) {
	yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalDetails?: AdditionalInformation
) {
	try {
		const userSnapshot = yield* call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);
		if (userSnapshot) {
			yield* put(
				signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
			);
		}
	} catch (err) {
		yield* put(signInFailed(err as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		let userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield* call(getSnapshotFromUserAuth, userAuth);
	} catch (err) {
		yield* put(signInFailed(err as Error));
	}
}

export function* signInWithGoogle() {
	try {
		yield* put(startLoading());
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getSnapshotFromUserAuth, user);
	} catch (err) {
		yield* put(signInFailed(err as Error));
	}
}

export function* signInWithEmail({
	payload: { email, password },
}: EmailSignInStart) {
	try {
		yield* put(startLoading());
		const userCredential = yield* call(
			signAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential;
			yield* call(getSnapshotFromUserAuth, user);
		}
	} catch (err) {
		yield* put(signInFailed(err as Error));
	}
}

export function* onCheckUserSession() {
	yield* takeLatest(
		USER_ACTION_TYPES.CHECK_USER_SESSION,
		isUserAuthenticated
	);
}

export function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onEmailSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
