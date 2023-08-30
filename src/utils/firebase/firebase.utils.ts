import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';

export type ObjectToAdd = {
	title: string;
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

const firebaseConfig = {
	apiKey: 'AIzaSyAPnFHII7X6VXnfithvguLkzpSCsOifOXA',
	authDomain: 'e-commerce-react-v18.firebaseapp.com',
	projectId: 'e-commerce-react-v18',
	storageBucket: 'e-commerce-react-v18.appspot.com',
	messagingSenderId: '510925206837',
	appId: '1:510925206837:web:0699396f1a97a9d60fc87c',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('Finish');
};

export const getCategoriesAndDocuments = async (
	collectionName: string
): Promise<Category[]> => {
	const collectionRef = collection(db, collectionName);
	const q = query(collectionRef);

	const querySnapShot = await getDocs(q);
	return querySnapShot.docs.map((docSnapshot) =>
		docSnapshot.data()
	) as Category[];
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additional: AdditionalInformation = {}
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additional,
			});
		} catch (err) {
			console.log('Error in Creating The User', err);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
	if (!callback) return;
	onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};