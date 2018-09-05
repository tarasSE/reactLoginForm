import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Application from "./app/application/Application";

ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();
