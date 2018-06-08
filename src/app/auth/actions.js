import {LOG_IN, REGISTER} from "../actionTypes";

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