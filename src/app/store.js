import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './sagas';
import {localStorageMiddleware} from "../middlewares";
import {setLanguage} from "./actions";
import {tokenAuth} from "./auth/actions";

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
    localStorageMiddleware
];

const initStore = store => {
    if(!localStorage.getItem('app-lang')){
        const langList = ['en','ru'];
        let lang = navigator.language?navigator.language.substr(0,2):langList[0];
        if(!lang || langList.indexOf(lang) < 0){
            lang = langList[0];
        }
        localStorage.setItem('app-lang', lang);
        store.dispatch(setLanguage(lang));
    }
    if (localStorage.getItem('user-token') && !store.getState().auth.user) {
        store.dispatch(tokenAuth(localStorage.getItem('user-token')));
    }
};

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);
sagaMiddleware.run(rootSaga);

initStore(store);

export default store;