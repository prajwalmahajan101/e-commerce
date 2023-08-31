import CATEGORIES_ACTION_TYPES from './category.types';
import {
	createAction,
	Action,
	ActionWithPayLoad,
	withMatcher,
} from '../../utils/reducer/reducer.utils';

import { Category } from './category.types';

export type FetchCategoriesStart =
	Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesFailed = ActionWithPayLoad<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	Error
>;

export type FetchCategoriesSuccess = ActionWithPayLoad<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;

export const fetchCategoriesStart = withMatcher(() =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher((categories: Category[]) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
);

export const fetchCategoriesFailed = withMatcher((error: Error) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
