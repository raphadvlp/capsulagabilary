// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvBpaefejjMNPTN_A-yV5s6F0_okQFJZk",
  authDomain: "capsuladotempo-9d755.firebaseapp.com",
  projectId: "capsuladotempo-9d755",
  storageBucket: "capsuladotempo-9d755.appspot.com",
  messagingSenderId: "869092303974",
  appId: "1:869092303974:web:7d5b69c10147a178ddb9a7",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
