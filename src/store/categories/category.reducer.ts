import { Category } from './category.types';
import { AnyAction } from 'redux';
import {
	fetchCategoriesFailed,
	fetchCategoriesStart,
	fetchCategoriesSuccess,
} from './category.action';

export type CategoriesState = {
	readonly categories: Category[];
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const CATEGORIES_INITIAL_STATE: CategoriesState = {
	categories: [],
	isLoading: false,
	error: null,
};

const categoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	action = {} as AnyAction
): CategoriesState => {
	if (fetchCategoriesStart.match(action)) {
		return { ...state, isLoading: true };
	} else if (fetchCategoriesSuccess.match(action)) {
		return {
			isLoading: false,
			categories: action.payload,
			error: null,
		};
	} else if (fetchCategoriesFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	} else return state;
};

export default categoriesReducer;
