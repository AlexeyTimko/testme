import {GET_TEST_LIST, SAVE_TEST} from "../actionTypes";

export const saveTest = (data) => {
    return {
        type: SAVE_TEST,
        payload: data
    }
};
export const getTestList = () => {
    return {
        type: GET_TEST_LIST,
        payload: {}
    }
};