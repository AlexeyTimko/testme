import React from 'react';
import {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import store, {history} from "./app/store";
import {Provider} from "react-redux";
import {ConnectedRouter} from 'react-router-redux';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
