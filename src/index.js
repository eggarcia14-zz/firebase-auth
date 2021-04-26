import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

firebase.initializeApp({
  apiKey: "AIzaSyAhRCLqko2NAvim9-PgEv1ZzktVQe8au6M",
  authDomain: "pseudogram-83ffa.firebaseapp.com",
  projectId: "pseudogram-83ffa",
  storageBucket: "pseudogram-83ffa.appspot.com",
  messagingSenderId: "725959543672",
  appId: "1:725959543672:web:87bd8fc852cc829362568d",
  measurementId: "G-ZKXQ8BQPPE"
});

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
