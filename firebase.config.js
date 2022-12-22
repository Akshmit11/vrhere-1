import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCoOUUTCyhZvSnZ2gSQvmO4T0oD_fINEb8",
  authDomain: "vrhere-1.firebaseapp.com",
  projectId: "vrhere-1",
  storageBucket: "vrhere-1.appspot.com",
  messagingSenderId: "222125858173",
  appId: "1:222125858173:web:7aaea06bc58c7211958014"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const authClient = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const storage = getStorage(app);

export { authClient, db, app, provider, storage };