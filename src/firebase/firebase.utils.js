import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDV8r8B8D9wCtyGEpHQykD02mXzBS0McGI",
    authDomain: "crwn-db-dongyu.firebaseapp.com",
    databaseURL: "https://crwn-db-dongyu.firebaseio.com",
    projectId: "crwn-db-dongyu",
    storageBucket: "crwn-db-dongyu.appspot.com",
    messagingSenderId: "1033159266271",
    appId: "1:1033159266271:web:0248f21a7cdfb43e573e6a",
    measurementId: "G-BP5J0F3GNK"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;