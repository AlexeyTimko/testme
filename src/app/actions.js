import {SET_LANGUAGE} from "./actionTypes";
import lang from '../i18n';

export const setLanguage = locale => {
    return {
        type: SET_LANGUAGE,
        payload: {
            ...lang['en'],
            ...lang[locale]
        },
        locale
    }
};