import CART_ACTION_TYPES, { CartItem } from './cart.types';
import {
	ActionWithPayLoad,
	createAction,
	withMatcher,
} from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../categories/category.types';

const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
): CartItem[] => {
	const existingItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	if (existingItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
): CartItem[] => {
	const existingItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);
	if (existingItem && existingItem.quantity === 1) {
		return cartItems.filter(
			(cartItem) => cartItem.id !== cartItemToRemove.id
		);
	} else {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem
		);
	}
};

const clearCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
): CartItem[] => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export type SetIsCartOpen = ActionWithPayLoad<
	CART_ACTION_TYPES.SET_IS_CART_OPEN,
	boolean
>;

export type UpdateCartItems = ActionWithPayLoad<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

export const updateCartItems = withMatcher(
	(cartItems: CartItem[]): UpdateCartItems => {
		return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
	}
);

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
	return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
});

export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return updateCartItems(newCartItems);
};

export const removeItemFromCart = (
	cartItems: CartItem[],
	cartItem: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, cartItem);
	return updateCartItems(newCartItems);
};

export const clearItemFromCart = (
	cartItems: CartItem[],
	cartItem: CartItem
) => {
	const newCartItems = clearCartItem(cartItems, cartItem);
	return updateCartItems(newCartItems);
};
