// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB5jwEIM9t5uh7PmuuNt5tRO7fMm7BU2b4",
    authDomain: "doctorchat-clone.firebaseapp.com",
    projectId: "doctorchat-clone",
    storageBucket: "doctorchat-clone.appspot.com",
    messagingSenderId: "281132107666",
    appId: "1:281132107666:web:3c419c9d9037f4c016e34b",
    measurementId: "G-RGBYPVCHLB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth= firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;