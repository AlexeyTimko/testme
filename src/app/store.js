import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './sagas';
import {localStorageMiddleware} from "../middlewares";

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
    localStorageMiddleware
];

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);
sagaMiddleware.run(rootSaga);

export default store;