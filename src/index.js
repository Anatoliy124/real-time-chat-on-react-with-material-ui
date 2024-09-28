import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzLr06NcOf_sQ_FVVQCP94NyZlHL-BVgg",
  authDomain: "chat-2aec9.firebaseapp.com",
  projectId: "chat-2aec9",
  storageBucket: "chat-2aec9.appspot.com",
  messagingSenderId: "993045643968",
  appId: "1:993045643968:web:f40d4ead66a672c804e325",
  measurementId: "G-GEBX9R83LD"
};

const app = initializeApp(firebaseConfig);

export const Context = createContext(null);

const auth = getAuth(app);
const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ auth, firestore }}>
    <App />
  </Context.Provider>
);
