// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	// auth,
	// signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';

import SignUpFrom from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
	// useEffect(() => {
	// 	const fet = async () => {
	// 		const response = await getRedirectResult(auth);
	// 		if (response) {
	// 			const userDoc = await createUserDocumentFromAuth(response.user);
	// 		}
	// 	};
	// 	fet();
	// }, []);

	const loginUser = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};
	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={loginUser}>Sign In with Google</button>
			{/* <button onClick={signInWithGoogleRedirect}>
				Sign In with Google Redirect
			</button> */}
			<SignUpFrom />
		</div>
	);
};
export default SignIn;
