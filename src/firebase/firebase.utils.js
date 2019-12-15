import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAnk56bhaZqqpRpD22-9Wy2Ud4f-18M7p4",
  authDomain: "crwn-db-d2cdf.firebaseapp.com",
  databaseURL: "https://crwn-db-d2cdf.firebaseio.com",
  projectId: "crwn-db-d2cdf",
  storageBucket: "crwn-db-d2cdf.appspot.com",
  messagingSenderId: "1000327257776",
  appId: "1:1000327257776:web:4c65c89840dbd7a77ae575",
  measurementId: "G-0Z0E4KM3Q9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
