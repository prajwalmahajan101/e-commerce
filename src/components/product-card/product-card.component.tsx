import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { Footer, ProductCardContainer } from './product-card.styles';
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardProps = {
	product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const dispatch = useDispatch();
	const { name, price, imageUrl } = product;
	const cartItems = useSelector(selectCartItems);
	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer className="footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
			>
				Add to Cart
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
