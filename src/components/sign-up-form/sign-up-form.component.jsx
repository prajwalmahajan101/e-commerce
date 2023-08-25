import { useState, useContext } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const SignUpForm = () => {
	const { setCurrentUser } = useContext(UserContext);

	const defaultFormFields = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [formFields, setFormFields] = useState(defaultFormFields);

	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormFields((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const resetForm = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		if (confirmPassword !== password) {
			alert('passwords do not match');
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });
			setCurrentUser(user);
			resetForm();
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			}
			console.log('User Creation encountered a error :', err.message);
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					onChange={handleChange}
					name="displayName"
					value={displayName}
					required
				/>
				<FormInput
					label="Email"
					type="email"
					onChange={handleChange}
					name="email"
					value={email}
					required
				/>
				<FormInput
					label="Password"
					type="password"
					onChange={handleChange}
					name="password"
					value={password}
					required
				/>
				<FormInput
					label="Confirm Password"
					type="password"
					onChange={handleChange}
					name="confirmPassword"
					value={confirmPassword}
					required
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
