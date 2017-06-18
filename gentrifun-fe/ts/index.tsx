declare var module: any;
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { config, Enviroment } from "./config";
import { BrowserRouter } from 'react-router-dom'
import Header from "./components/header"
import Routes from "./components/routes"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from "./shared/redux/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();