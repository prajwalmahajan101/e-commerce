import { AnyAction } from 'redux';
import { setIsCartOpen, updateCartItems } from './cart.action';
import { CartItem } from './cart.types';

export type CartState = {
	readonly isCartOpen: boolean;
	readonly cartItems: CartItem[];
};

const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};

const cartReducer = (
	state = CART_INITIAL_STATE,
	action: AnyAction
): CartState => {
	if (setIsCartOpen.match(action)) {
		return {
			...state,
			isCartOpen: action.payload,
		};
	} else if (updateCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload,
		};
	} else return state;
};

export default cartReducer;
