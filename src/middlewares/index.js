import {SET_LANGUAGE} from "../app/actionTypes";
import {setLanguage} from "../app/actions";

export const localStorageMiddleware = store => next => action => {
    switch (action.type) {
        case SET_LANGUAGE:
            if (localStorage.getItem('app-lang') !== action.locale) {
                localStorage.setItem('app-lang', action.locale);
            }
            break;
        default:
            if(!localStorage.getItem('app-lang')){
                const langList = ['en','ru'];
                let lang = navigator.language?navigator.language.substr(0,2):langList[0];
                if(!lang || langList.indexOf(lang) < 0){
                    lang = langList[0];
                }
                localStorage.setItem('app-lang', lang);
                store.dispatch(setLanguage(lang));
            }
    }
    next(action);
};