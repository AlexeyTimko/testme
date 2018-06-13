import {LOG_IN_SUCCEEDED, LOG_OUT, SET_LANGUAGE} from "../app/actionTypes";

export const localStorageMiddleware = store => next => action => {
    switch (action.type) {
        case SET_LANGUAGE:
            if (localStorage.getItem('app-lang') !== action.locale) {
                localStorage.setItem('app-lang', action.locale);
            }
            break;
        case LOG_IN_SUCCEEDED:
            if (localStorage.getItem('user-token') !== action.payload.token) {
                localStorage.setItem('user-token', action.payload.token);
            }
            break;
        case LOG_OUT:
            if (localStorage.getItem('user-token')) {
                localStorage.removeItem('user-token');
            }
            break;
        default:
    }
    next(action);
};