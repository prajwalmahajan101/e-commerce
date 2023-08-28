import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
	CartIconContainer,
	ShoppingIcon,
	ItemCount,
} from './cart-icon.styles.jsx';

const CartIcon = () => {
	const { setIsCartOpen } = useContext(CartContext);
	const toggleIsCartOpen = () => {
		setIsCartOpen((prevState) => !prevState);
	};
	const { cartCount } = useContext(CartContext);
	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
