import React from 'react';

import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
