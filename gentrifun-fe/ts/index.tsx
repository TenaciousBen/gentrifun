declare var module: any;
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { config, Enviroment } from "./config";
import { BrowserRouter } from 'react-router-dom'
import Header from "./components/header/header"
import Main from "./components/main/main"

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();