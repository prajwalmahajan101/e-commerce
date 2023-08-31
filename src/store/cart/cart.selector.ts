import { createSelector } from 'reselect';
import { CartItem } from './cart.types';
import { CartState } from './cart.reducer';
import { RootState } from '../store';

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	(cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(total: number, item: CartItem): number => total + item.quantity,
		0
	)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(total: number, item: CartItem): number =>
			total + item.quantity * item.price,
		0
	)
);
