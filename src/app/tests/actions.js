import {
    ANSWER_TEST, DELETE_TEST, EDIT_FORM_CLOSE, EDIT_FORM_OPEN, GET_TEST_LIST, LOAD_TEST, RESET_TEST, SAVE_TEST, SEARCH,
    UPDATE_TEST
} from "../actionTypes";

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
export const editFormOpen = (id = null) => {
    return {
        type: EDIT_FORM_OPEN,
        payload: id
    }
};
export const editFormClose = () => {
    return {
        type: EDIT_FORM_CLOSE
    }
};
export const answerTest = (data) => {
    return {
        type: ANSWER_TEST,
        payload: data
    }
};
export const deleteTest = (data) => {
    return {
        type: DELETE_TEST,
        payload: data
    }
};
export const loadTest = id => {
    return {
        type: LOAD_TEST,
        payload: id
    }
};
export const getTestList = params => {
    return {
        type: GET_TEST_LIST,
        payload: params
    }
};
export const search = param => {
    return {
        type: SEARCH,
        payload: {search: param}
    }
};