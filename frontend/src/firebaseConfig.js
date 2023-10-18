// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import { getStorage} from 'firebase/storage'

export const firebaseConfig = {



  apiKey: import.meta.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.VITE_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storege = getStorage(app);
export default app
