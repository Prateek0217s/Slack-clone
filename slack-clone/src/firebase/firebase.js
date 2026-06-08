import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCrZtr4b9avD29kGdUOCE6MIYNLRKtZN9g",
  authDomain: "slack-clone-3de3e.firebaseapp.com",
  projectId: "slack-clone-3de3e",
  storageBucket: "slack-clone-3de3e.firebasestorage.app",
  messagingSenderId: "975386232072",
  appId: "1:975386232072:web:e6cd73ee7517a5636458bd",
  measurementId: "G-JZSR6C2N21"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)