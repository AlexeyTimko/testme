import {CLOSE_FLASH_MESSAGE, OPEN_FLASH_MESSAGE, SET_LANGUAGE, TOGGLE_FLASH_MESSAGE} from "./actionTypes";
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

export const openFM = (color, message) => {
    return {
        type: OPEN_FLASH_MESSAGE,
        color,
        payload: message
    }
};
export const closeFM = () => {
    return {
        type: CLOSE_FLASH_MESSAGE
    }
};
export const toggleFM = () => {
    return {
        type: TOGGLE_FLASH_MESSAGE
    }
};