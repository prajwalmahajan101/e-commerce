import React from 'react';
import {
	DirectoryItemContainer,
	BackgroundImage,
	Body,
} from './directory-item.styles.jsx';
const DirectoryItem = ({ imageUrl, title }) => {
	return (
		<DirectoryItemContainer>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
