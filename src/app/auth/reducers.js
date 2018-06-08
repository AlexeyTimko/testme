import {HIDE_AUTH_FORM, HIDE_REG_FORM, LOG_IN_SUCCEEDED, LOG_OUT, SHOW_AUTH_FORM, SHOW_REG_FORM} from "../actionTypes";

export const auth = (state = {
    user: null,
    authShow: false,
    regShow: false,
    token: localStorage.getItem('user-token')
}, action) => {
    switch (action.type) {
        case LOG_IN_SUCCEEDED:
            return {
                ...state,
                user: action.payload,
                authShow: false,
                regShow: false,
                token: action.payload.token
            };
        case LOG_OUT:
            return {
                ...state,
                user: null,
                authShow: false,
                regShow: false,
                token: null
            };
        case SHOW_AUTH_FORM:
            return {
                ...state,
                authShow: true,
            };
        case HIDE_AUTH_FORM:
            return {
                ...state,
                authShow: false,
            };
        case SHOW_REG_FORM:
            return {
                ...state,
                regShow: true,
            };
        case HIDE_REG_FORM:
            return {
                ...state,
                regShow: false,
            };
        default:
            return state;
    }
};