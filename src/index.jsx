import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from "./app/application/Application";
import runtime from 'serviceworker-webpack-plugin/lib/runtime';


ReactDOM.render(<Application />, document.getElementById('root'));
if ('serviceWorker' in navigator) {
    const registration = runtime.register();
}