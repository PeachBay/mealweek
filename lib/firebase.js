import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, writeBatch, doc } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';

// Init
const firebaseClientInitConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseClientInitConfig);

// service
export const auth = getAuth(app);
export const db = getFirestore(app);

// writeBatch
export const createUserInFirestore = async (name, user, username) => {
  const batch = writeBatch(db);

  // Create refs for both documents
  const userDoc = doc(db, 'users', user.uid);
  const usernameDoc = doc(db, 'usernames', username);

  // Commit both docs together as a batch write.
  batch.set(userDoc, {
    username: username,
    photoURL: user.photoURL,
    displayName: user.displayName,
    name: name,
  });
  batch.set(usernameDoc, { uid: user.uid });
  await batch.commit();
};

// sign-in handle
const googleAuthProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleAuthProvider);
};

export const signInEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      showNotification({
        title: 'Authentication failed.',
        message: 'Your e-mail or password is invalid. Try again 🧐',
        color: 'red',
        icon: <IconX />,
      });
    });
};

export const signUpWithEmailAndPassword = async (name, username, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      createUserInFirestore(name, user, username);
    })
    .catch((error) => {
      const errorCode = error.code;
      showNotification({
        title: `${errorCode} - Signup failed.`,
        message: 'Error while signup. Please contact the support.',
        color: 'red',
        icon: <IconX />,
      });
    });
};

// sign-out handle
export const signOutHandle = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('logout successfully');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};
