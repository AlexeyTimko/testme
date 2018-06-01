import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {tests} from "./tests/reducers";
import lang from '../i18n';
import {SET_LANGUAGE} from "./actionTypes";

const savedLang = localStorage.getItem('app-lang') || 'en';

const lng = (state = {locale: savedLang, _: lang[savedLang]}, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                locale: action.locale,
                _: action.payload
            };
        default:
            return state;
    }
};

export default combineReducers({
    routing: routerReducer,
    tests,
    lng
})