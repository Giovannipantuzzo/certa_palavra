const admin = require('firebase-admin');
import { initializeApp, getApps } from "firebase/app";
import getStorage from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";

const serviceAccount = require('../../serviceAccountKey.json');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSEND,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  };
  
// Initialize Firebase
if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  module.exports = {
    storage: storage,
  }
}

const auth = getAuth();

module.exports = {

  async createNewUser(email, password) {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      return response.user.uid;
    } catch (err) {
      throw new Error(err);
    }
  },

  async deleteUser(id) {
    try {
      const result = await admin.auth().deleteUser(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async changeUserEmail(uid, newEmail) {
    try {
      const result = await admin.auth().updateUser(uid, { email: newEmail });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async changeUserPassword(uid, newPassword) {
    try {
      const result = await admin.auth()
        .updateUser(uid, { password: newPassword });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async login(email, password) {
    try {
      if (!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.lastIndexOf('.')) throw new Error('Badly formatted email');
      const result = await firebase.auth()
        .signInWithEmailAndPassword(email, password);
      return result.user.uid;
    } catch (error) {
      throw new Error(error);
    }
  },

  async firebaseChangeUserPassword(email) {
    try {
      const result = await firebase.auth().sendPasswordResetEmail(email);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

};
