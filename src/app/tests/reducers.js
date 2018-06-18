import {
    ANSWER_TEST_RESULT, EDIT_FORM_CLOSE, EDIT_FORM_OPEN,
    GET_TEST_LIST_SUCCEEDED,
    LOAD_TEST_SUCCEEDED,
    RESET_TEST,
    UPDATE_TEST
} from "../actionTypes";

export const tests = (state = [], action) => {
    switch (action.type) {
        case GET_TEST_LIST_SUCCEEDED:
            return action.payload;
        default:
            return state;
    }
};
export const editForm = (state = {
    visible: false,
    id: null
}, action) => {
    switch (action.type) {
        case EDIT_FORM_OPEN:
            return {
                visible: true,
                id: action.payload
            };
        case EDIT_FORM_CLOSE:
            return {
                visible: false,
                id: null
            };
        default:
            return state;
    }
};
const emptyTest = {
    name: '',
    description: '',
    isprivate: false,
    islimited: false,
    timelimit: 60,
    image: '',
    questions: [],
};
export const test = (state = emptyTest, action) => {
    switch (action.type) {
        case LOAD_TEST_SUCCEEDED:
            return action.payload;
        case UPDATE_TEST:
            return action.payload;
        case ANSWER_TEST_RESULT:
            return {
                ...state,
                result: action.payload
            };
        case RESET_TEST:
            return emptyTest;
        default:
            return state;
    }
};