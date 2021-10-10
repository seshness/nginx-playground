import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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

/*global globalThis*/
globalThis.nginx({
  print: console.log,
  printErr: function(...args) {
    console.warn(...args);
  },
  noInitialRun: true,
  onRuntimeInitialized() {
    this.callMain(['-v'])
  },
  onAbort() {
    console.log('nginx aborted')
  },
  onExit() {
    console.log('nginx exited')
  },
});
