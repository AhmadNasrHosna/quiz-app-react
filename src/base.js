import firebase from "firebase";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC4zRYcLeyQBlYatXIAck-Y9yvEmxltLbE",
  authDomain: "ahquiz.firebaseapp.com",
  databaseURL: "https://ahquiz.firebaseio.com",
  projectId: "ahquiz",
  storageBucket: "ahquiz.appspot.com",
  messagingSenderId: "572978452662",
  appId: "1:572978452662:web:9983bf7b75b91b02b26e17",
  measurementId: "G-LM6QMHN1H7",
});

export default firebase;
