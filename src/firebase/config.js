import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyAtfdgfU2EsEQJIuEgsW7e7Nqier-NyCHM",
   authDomain: "money-2206b.firebaseapp.com",
   projectId: "money-2206b",
   storageBucket: "money-2206b.appspot.com",
   messagingSenderId: "999109008667",
   appId: "1:999109008667:web:917424db9df1e0a5d787be"
 };

// initialize firebase (whole module), then firestore the db part

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// then initialize authentication

const auth = firebase.auth();

// object for adding timestamp to new documents

const timestamp = firebase.firestore.Timestamp;

export { db, auth, timestamp };