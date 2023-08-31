import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { signUpStart } from '../../store/user/user.action';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles';

const SignUpForm = () => {
	const dispatch = useDispatch();

	const defaultFormFields = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [formFields, setFormFields] = useState(defaultFormFields);

	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = evt.target;
		setFormFields((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const resetForm = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (confirmPassword !== password) {
			alert('passwords do not match');
			return;
		}
		try {
			dispatch(signUpStart(email, password, displayName));
			resetForm();
		} catch (err) {
			if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
				alert('Cannot create user, email already in use');
			}
			console.log(
				'User Creation encountered a error :',
				(err as AuthError).message
			);
		}
	};

	return (
		<SignUpContainer>
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
		</SignUpContainer>
	);
};

export default SignUpForm;
