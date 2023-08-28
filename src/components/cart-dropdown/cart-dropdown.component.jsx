import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import {
	CartItems,
	CartDropdownContainer,
	EmptyMessage,
} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const gotoCheckout = () => {
		navigate('/checkout');
	};
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
