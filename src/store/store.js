import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleware = [logger];
const composedEnhancers = compose(applyMiddleware(...middleware));

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

export const persistor = persistStore(store);

// const loggerMiddleware = (store) => (next) => (action) => {
// 	if (!action.type) {
// 		return next();
// 	}

// 	// console.log('type', action.type);
// 	// console.log('payload', action.payload);
// 	// console.log('currentState :', store.getState());
// 	next(action);
// 	// console.log('next state :', store.getState());
// };
