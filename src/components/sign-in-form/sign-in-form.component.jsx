import { useState } from 'react';

import {
	signInWithGooglePopup,
	signAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';
const SignInForm = () => {
	const defaultFormFields = {
		email: '',
		password: '',
	};

	const [formFields, setFormFields] = useState(defaultFormFields);

	const { email, password } = formFields;

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

		try {
			await signAuthUserWithEmailAndPassword(email, password);
			resetForm();
		} catch (err) {
			switch (err.code) {
				case 'auth/wrong-password':
					alert('Wrong Password');
					break;
				case 'auth/user-not-found':
					alert('User with Email not found');
					break;
				default:
					console.log(err);
			}
		}
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	return (
		<div className="sign-in-container">
			<h2>Already have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
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
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType="google"
						onClick={signInWithGoogle}
					>
						Sign In With Google
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
