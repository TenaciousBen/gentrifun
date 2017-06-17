import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Main from "./components/main/main";
ReactDOM.render(React.createElement(BrowserRouter, null,
    React.createElement(Main, null)), document.getElementById('root'));
registerServiceWorker();
