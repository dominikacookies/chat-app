import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCv3qHsGW7nv89ina8ptk2adokTlbx7434",
    authDomain: "chat-app-452c3.firebaseapp.com",
    projectId: "chat-app-452c3",
    storageBucket: "chat-app-452c3.appspot.com",
    messagingSenderId: "288045511246",
    appId: "1:288045511246:web:78589e4afe5bc20472091f",
  })
  .auth();
