import {SET_LANGUAGE} from "../app/actionTypes";

export const localStorageMiddleware = store => next => action => {
    switch (action.type) {
        case SET_LANGUAGE:
            if (localStorage.getItem('app-lang') !== action.locale) {
                localStorage.setItem('app-lang', action.locale);
            }
            break;
        default:
            if(!localStorage.getItem('app-lang')){
                localStorage.setItem('app-lang', 'en');
            }
    }
    next(action);
};