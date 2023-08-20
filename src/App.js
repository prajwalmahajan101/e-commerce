import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/home/home.components';

const Navigation = () => {
	return (
		<div>
			<div>
				<h1>I am Navigation Bar</h1>
			</div>
			<Outlet />
		</div>
	);
};

const Shop = () => {
	return <h1>I am Shop Page</h1>;
};

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
			</Route>
		</Routes>
	);
};

export default App;
