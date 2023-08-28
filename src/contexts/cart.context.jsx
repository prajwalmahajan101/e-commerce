import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	total: 0,
});

export const CART_REDUCER_ACTIONS = {
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
	UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	total: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_REDUCER_ACTIONS.SET_IS_CART_OPEN:
			return {
				...state,
				...payload,
			};
		case CART_REDUCER_ACTIONS.UPDATE_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		default:
			throw new Error(`Unhandled Action Of Type ${type} in Cart reducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	const { isCartOpen, cartItems, cartCount, total } = state;

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItems(newCartItems);
	};

	const removeItemFromCart = (cartItem) => {
		const newCartItems = removeCartItem(cartItems, cartItem);
		updateCartItems(newCartItems);
	};

	const clearItemFromCart = (cartItem) => {
		const newCartItems = clearCartItem(cartItems, cartItem);
		updateCartItems(newCartItems);
	};

	const updateCartItems = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, item) => total + item.quantity,
			0
		);
		const newTotal = newCartItems.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);

		let payload = {
			cartItems: newCartItems,
			cartCount: newCartCount,
			total: newTotal,
		};
		dispatch(createAction(CART_REDUCER_ACTIONS.UPDATE_CART_ITEMS, payload));
		// dispatch({ type: CART_REDUCER_ACTIONS.UPDATE_CART_ITEMS, payload });
	};

	const setIsCartOpen = (newState) => {
		const payload = {
			isCartOpen: newState,
		};

		dispatch(createAction(CART_REDUCER_ACTIONS.SET_IS_CART_OPEN, payload));
		// dispatch({ type: CART_REDUCER_ACTIONS.SET_IS_CART_OPEN, payload });
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartCount,
		total,
	};
	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
