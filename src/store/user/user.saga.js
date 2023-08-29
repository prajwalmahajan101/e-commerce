import { takeLatest, put, all, call } from 'redux-saga/effects';

import USER_ACTION_TYPES from './user.types';

import { signInSuccess, signInFailed } from './user.action.js';
import {
	getCurrentUser,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotUserAuth(userAuth, additionalDetails) {
	try {
		const userSnapshot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);
		console.log(userSnapshot);
		console.log(userSnapshot.doc());
	} catch (err) {
		yield put(signInFailed(err));
	}
}

export function* isUserAuthenticated() {
	try {
		let userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotUserAuth, userAuth);
	} catch (err) {
		yield put(signInFailed(err));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
	yield all([onCheckUserSession]);
}
