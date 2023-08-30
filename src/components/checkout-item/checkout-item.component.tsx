import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart,
} from '../../store/cart/cart.action';

import {
	CheckoutItemContainer,
	RemoveButton,
	ImageContainer,
} from './checkout-item.styles';
import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
	cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, imageUrl, price, quantity } = cartItem;

	const clearItemHelper = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));
	const removeItemHelper = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));
	const addItemHelper = () => dispatch(addItemToCart(cartItems, cartItem));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={removeItemHelper}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={addItemHelper}>
					&#10095;
				</div>
			</span>
			<span className="price">{price}</span>
			<RemoveButton onClick={clearItemHelper}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
