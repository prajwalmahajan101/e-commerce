import React, { FC } from 'react';
import { CartItemContainer, ItemDetails } from './cart-item.styles';
import { CartItem as CartItemType } from '../../store/cart/cart.types';

type CartItemProps = {
	cartItem: CartItemType;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={name} />
			<ItemDetails>
				<span className="name">{name}</span>
				<span className="price">
					{quantity} X ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
