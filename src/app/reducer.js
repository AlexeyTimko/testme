import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {editForm, test, tests} from "./tests/reducers";
import lang from '../i18n';
import {CLOSE_FLASH_MESSAGE, OPEN_FLASH_MESSAGE, SET_LANGUAGE, TOGGLE_FLASH_MESSAGE} from "./actionTypes";
import {auth} from "./auth/reducers";

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

const fm = (state = {
    show: false,
    color: 'danger',
    message: ''
}, action) => {
    switch (action.type) {
        case OPEN_FLASH_MESSAGE:
            return {
                show: true,
                color: action.color,
                message: action.payload
            };
        case CLOSE_FLASH_MESSAGE:
            return {
                show: false
            };
        case TOGGLE_FLASH_MESSAGE:
            return {
                ...state,
                show: !state.show
            };
        default:
            return state;
    }
};

export default combineReducers({
    routing: routerReducer,
    auth,
    editForm,
    tests,
    test,
    lng,
    fm
})