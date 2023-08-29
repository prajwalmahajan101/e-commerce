import CATEGORIES_ACTION_TYPES from './category.types';

const CATEGORIES_INITIAL_STATE = {
	categories: [],
	isLoading: false,
	error: null,
};

const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
	const { type, payload } = action;
	switch (type) {
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return { ...state, isLoading: true };
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return { ...state, isLoading: false, error: payload };
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				categories: payload,
			};
		default:
			return state;
	}
};

export default categoriesReducer;
