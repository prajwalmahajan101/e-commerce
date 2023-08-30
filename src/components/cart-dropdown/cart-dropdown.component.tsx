import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import {
	CartItems,
	CartDropdownContainer,
	EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();

	const gotoCheckout = useCallback(() => {
		navigate('/checkout');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => (
						<CartItem key={item.id} cartItem={item} />
					))
				) : (
					<EmptyMessage>Cart is Empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={gotoCheckout}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
