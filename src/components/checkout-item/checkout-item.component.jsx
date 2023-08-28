import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart,
} from '../../store/cart/cart.action';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, imageUrl, price, quantity } = cartItem;

	const clearItemHelper = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));
	const removeItemHelper = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));
	const addItemHelper = () => dispatch(addItemToCart(cartItems, cartItem));

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={`${name}`} />
			</div>
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
			<div className="remove-button" onClick={clearItemHelper}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
