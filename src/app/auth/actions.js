import {HIDE_AUTH_FORM, HIDE_REG_FORM, LOG_IN, LOG_OUT, REGISTER, SHOW_AUTH_FORM, SHOW_REG_FORM} from "../actionTypes";

export const register = (data) => {
    return {
        type: REGISTER,
        payload: data
    }
};
export const logIn = (data) => {
    return {
        type: LOG_IN,
        payload: data
    }
};
export const tokenAuth = token => {
    return {
        type: LOG_IN,
        payload: {token}
    }
};
export const showAuth = () => ({type: SHOW_AUTH_FORM});
export const hideAuth = () => ({type: HIDE_AUTH_FORM});
export const showReg = () => ({type: SHOW_REG_FORM});
export const hideReg = () => ({type: HIDE_REG_FORM});
export const logOut = () => ({type: LOG_OUT});