import {ANSWER_TEST, GET_TEST_LIST, LOAD_TEST, RESET_TEST, SAVE_TEST, UPDATE_TEST} from "../actionTypes";

export const saveTest = (data) => {
    return {
        type: SAVE_TEST,
        payload: data
    }
};
export const updateTest = (data) => {
    return {
        type: UPDATE_TEST,
        payload: data
    }
};
export const resetTest = () => {
    return {
        type: RESET_TEST
    }
};
export const answerTest = (data) => {
    return {
        type: ANSWER_TEST,
        payload: data
    }
};
export const loadTest = id => {
    return {
        type: LOAD_TEST,
        payload: id
    }
};
export const getTestList = () => {
    return {
        type: GET_TEST_LIST,
        payload: {}
    }
};