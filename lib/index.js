import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from './firebase.js';

import { app } from './configuration.js';

// import { db } from '... firebase-firestore.js'

const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

export function registerWithEmailAndPassword(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function loginWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function loginWithGoogle() {
  return signInWithPopup(auth, provider);
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}