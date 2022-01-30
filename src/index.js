import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQcL5vLtI5J3Z21u2iax7UvcajWOdoRVM",
  authDomain: "chatroomappwad.firebaseapp.com",
  projectId: "chatroomappwad",
  storageBucket: "chatroomappwad.appspot.com",
  messagingSenderId: "738514397599",
  appId: "1:738514397599:web:9a30edd7f20b276b2a35aa",
  measurementId: "G-KGRL7J936X"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
