import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const existingItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	// If found, increment quantity
	if (existingItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// return new Array with modified cartItem / new cartItem
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

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [total, setTotal] = useState(0);

	const addItemToCart = (productToAdd) => {
		setCartItems((prevState) => addCartItem(prevState, productToAdd));
	};

	const removeItemFromCart = (cartItem) => {
		setCartItems((prevState) => removeCartItem(prevState, cartItem));
	};

	const clearItemFromCart = (cartItem) => {
		setCartItems((prevState) => clearCartItem(prevState, cartItem));
	};

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, item) => total + item.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newTotal = cartItems.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);
		setTotal(newTotal);
	}, [cartItems]);

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
