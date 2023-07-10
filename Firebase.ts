import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDYY3i1a29p2hWlhIx7L-OCKohwdmrPY00",
  authDomain: "chatbot-c9892.firebaseapp.com",
  projectId: "chatbot-c9892",
  storageBucket: "chatbot-c9892.appspot.com",
  messagingSenderId: "529603548694",
  appId: "1:529603548694:web:4beb50ae137ac82b264737",
  measurementId: "G-7B1BJ6J9GJ"
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig); 
const db = getFirestore(firebaseApp);

export { db };

// const analytics = getAnalytics(app);