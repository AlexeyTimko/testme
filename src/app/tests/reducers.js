import {GET_TEST_LIST_SUCCEEDED} from "../actionTypes";

export const tests = (state = [], action) => {
    switch (action.type) {
        case GET_TEST_LIST_SUCCEEDED:
            return action.payload;
        default:
            return state;
    }
};