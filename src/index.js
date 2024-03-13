import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAVmZ7Ng7z0hmSiglXH1HxSz7yBHgVV2zw",
    authDomain: "info340-68efd.firebaseapp.com",
    databaseURL: "https://info340-68efd-default-rtdb.firebaseio.com",
    projectId: "info340-68efd",
    storageBucket: "info340-68efd.appspot.com",
    messagingSenderId: "494213119502",
    appId: "1:494213119502:web:63b864f6081d45ae61865f",
    measurementId: "G-2CBEX9LSR8"
};

initializeApp(firebaseConfig);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);