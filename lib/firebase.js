import { getApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';
import { getFirestore, writeBatch, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons';

// service
export const auth = getAuth(getApp());
export const db = getFirestore(getApp());
export const storage = getStorage(getApp());

// writeBatch
export const createUserInFirestore = async (user, name, username, email) => {
  const batch = writeBatch(db);

  // Create refs for both documents
  const userDoc = doc(db, 'users', user.uid);
  const usernameDoc = doc(db, 'usernames', username);

  // Commit both docs together as a batch write.
  batch.set(userDoc, {
    name: name,
    email: email,
    username: username,
    photoURL: user.photoURL,
    displayName: user.displayName || name,
  });
  batch.set(usernameDoc, { uid: user.uid });
  await batch.commit();
};

// update new photo to storage
export const uploadPhotoUser = async (user, uploadedFile, userSettings, setUserSettings) => {
  // Create ref to avatars document
  const storageRef = ref(storage, `avatars/${user.user.uid}`);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, uploadedFile).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    console.log(snapshot);
  });

  getDownloadURL(storageRef)
    .then((url) => {
      const userDoc = doc(db, 'users', user.user.uid);
      // Set the url string to photoURL property
      updateDoc(userDoc, {
        photoURL: url,
      });
      setUserSettings({ ...userSettings, photoUrl: url });
    })
    .catch((error) => {
      // Handle any errors
    });
};

// update new photo url to database with corresponding user
export const updatePhotoUserURL = async (user, photourl) => {
  // Create ref for user document
  const userDoc = doc(db, 'users', user.uid);

  // Set the url string to photoURL property
  await updateDoc(userDoc, {
    photoURL: photourl,
  });
};

// sign-in handle
const googleAuthProvider = new GoogleAuthProvider().addScope('profile').addScope('email');
export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleAuthProvider);
};

export const signInEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch(() => {
      const errorCode = error.code;

      const authError = {
        'auth/invalid-email': 'Your e-mail or password is invalid. Try again 🧐',
        'auth/user-disabled': 'This user has been disabled.',
        'auth/user-not-found': 'This user does not exist.',
        'auth/wrong-password': 'Your e-mail or password is invalid. Try again 🧐',
      };

      showNotification({
        title: 'Authentication failed',
        message: authError[errorCode],
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
      createUserInFirestore(user, name, username, email);
    })
    .catch((error) => {
      const errorCode = error.code;

      const authError = {
        'auth/email-already-in-use': 'This email is already used.',
        'auth/invalid-email': 'This email is invalid.',
        'auth/weak-password': 'The password is too weak.',
      };

      showNotification({
        title: 'Signup error',
        message: authError[errorCode],
        color: 'red',
        icon: <IconX />,
      });
    });
};

// forgot password handle
export const resetPassword = async (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      showNotification({
        title: 'Email succesfully sent!',
        message: `We have sent you an email to reset your password. Please, don\'t forget to check your spam folder.`,
        color: 'teal',
        icon: <IconCheck />,
      });
    })
    .catch((error) => {
      const errorCode = error.code;

      const authError = {
        'auth/invalid-email': 'This email is invalid.',
        'auth/user-not-found': 'There is no user corresponding to this email address.',
      };

      showNotification({
        title: 'Reset password error',
        message: authError[errorCode],
        color: 'red',
        icon: <IconX />,
      });
    });
};

// sign-out handle
export const signOutHandle = () => {
  signOut(auth);
};

// delete user handle
export const deleteAccount = async () => {
  const userCurrent = auth.currentUser;

  deleteUser(userCurrent)
    .then(() => {
      // User deleted.
    })
    .catch((error) => {
      const errorCode = error.code;

      const authError = {
        'auth/requires-recent-login': 'You need to re-login for this action.',
      };

      showNotification({
        title: 'Delete user error',
        message: authError[errorCode],
        color: 'red',
        icon: <IconX />,
      });
    });
};
