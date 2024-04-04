import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Scrypt, bsv } from 'scrypt-ts'
import { Voting2 } from './contracts/voting2';

import artifact from '../artifacts/voting2.json'

Voting2.loadArtifact(artifact)

Scrypt.init({
  apiKey: 'testnet_3wy8eqiqTktcHl62yezhUP3phfwkxK57Lf0cHi1sPoePPpMcI',
  network: bsv.Networks.testnet
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
