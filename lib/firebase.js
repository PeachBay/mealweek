import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCDbxQYM4wHZ28iujhE_OB9kvyThMEh3hU',
  authDomain: 'mealweek-4763d.firebaseapp.com',
  projectId: 'mealweek-4763d',
  storageBucket: 'mealweek-4763d.appspot.com',
  messagingSenderId: '197035681911',
  appId: '1:197035681911:web:589b3f2fa3b64dbe947e72',
  measurementId: 'G-4K7FTCQMJT',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
