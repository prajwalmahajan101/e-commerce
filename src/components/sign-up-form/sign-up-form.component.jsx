import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

const SignUpFrom = () => {
	const defaultFromFields = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [formFields, setFormFields] = useState(defaultFromFields);

	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormFields((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const resetForm = () => {
		setFormFields(defaultFromFields);
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
			resetForm();
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			}
			console.log('User Creation encountered a error :', err.message);
		}
	};

	return (
		<div>
			<h1>Sign up with your email and password</h1>
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
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUpFrom;
