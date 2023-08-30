import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	DirectoryItemContainer,
	BackgroundImage,
	Body,
} from './directory-item.styles';
import { DirectoryItemType } from '../directory/directory.component';

const DirectoryItem: FC<{ category: DirectoryItemType }> = ({ category }) => {
	const navigate = useNavigate();
	const { title, imageUrl, route } = category;
	const onNavigationHandle = () => navigate(route);
	return (
		<DirectoryItemContainer onClick={onNavigationHandle}>
			<BackgroundImage $imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
