import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const loginUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={loginUser}>Sign In with Google</button>
		</div>
	);
};
export default SignIn;
