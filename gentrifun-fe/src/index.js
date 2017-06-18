import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from "./components/routes";
import { Provider } from 'react-redux';
import store from "./shared/redux/store";
ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement(BrowserRouter, null,
        React.createElement(Routes, null))), document.getElementById('root'));
registerServiceWorker();
