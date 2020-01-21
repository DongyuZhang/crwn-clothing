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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if (!snapShot.exists) {
          const {displayName, email} = userAuth;
          const createAt = new Date();

          try {
              await userRef.set({
                  displayName,
                  email,
                  createAt,
                  ...additionalData
              })
          } catch (error) {
              console.log('error creating user', error.message);
          }
      }

      return userRef;
  };

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
      const collectionRef = firestore.collection(collectionKey);
      
      const batch = firestore.batch();
      console.log(objectsToAdd);
      objectsToAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef, obj);
      });

      return await batch.commit();
  };

  firebase.initializeApp(config);

  export const convertCollectionsSnapshotToMap = (collections) => {
      const transformedCollection = collections.docs.map(doc => {
          const { title, items } = doc.data();

          return {
              routeName: encodeURI(title.toLowerCase()),
              id: doc.id,
              title,
              items
          };
      });

      return transformedCollection.reduce((accumulator, collection) => {
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;
      }, {});
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;