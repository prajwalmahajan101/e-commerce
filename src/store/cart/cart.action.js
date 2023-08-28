import CART_ACTION_TYPES from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);
	if (existingItem.quantity === 1) {
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

const clearCartItem = (cartItems, cartItemToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

const updateCartItems = (cartItems) => {
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
};

export const setIsCartOpen = (bool) => {
	return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
};

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return updateCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems, cartItem) => {
	const newCartItems = removeCartItem(cartItems, cartItem);
	return updateCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems, cartItem) => {
	const newCartItems = clearCartItem(cartItems, cartItem);
	return updateCartItems(newCartItems);
};
