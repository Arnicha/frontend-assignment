import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Navigate replace to="/trips" />}/>
      <Route exact path="/trips" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
