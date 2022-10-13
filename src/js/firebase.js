// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJVkQ3lO-FaafDNUyZg2mKGsToHDx236E",
  authDomain: "roomplan-6b447.firebaseapp.com",
  projectId: "roomplan-6b447",
  storageBucket: "roomplan-6b447.appspot.com",
  messagingSenderId: "714364168431",
  appId: "1:714364168431:web:0db50f06d0f98826a3931a",
  measurementId: "G-0FYK9DKBQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();

export const getData = async (roomId) => {
  const docRef = doc(db, "roomplanData", roomId);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("fout");
  }
};
