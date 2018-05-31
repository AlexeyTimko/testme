import Api from '../../api';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import {
    GET_TEST_LIST, GET_TEST_LIST_FAILED, GET_TEST_LIST_SUCCEEDED, SAVE_TEST, SAVE_TEST_FAILED,
    SAVE_TEST_SUCCEEDED
} from "../actionTypes";

function* saveTest(action) {
    try {
        const data = yield call(Api.saveTest, action.payload);
        yield put({type: SAVE_TEST_SUCCEEDED, payload: data});
        yield put({type: GET_TEST_LIST});
    } catch (error) {
        yield put({type: SAVE_TEST_FAILED, error});
    }
}

function* getTestList(action) {
    try {
        const data = yield call(Api.getTestList, action.payload);
        yield put({type: GET_TEST_LIST_SUCCEEDED, payload: data});
    } catch (error) {
        yield put({type: GET_TEST_LIST_FAILED, error});
    }
}

function* watchSaveTest() {
    yield takeEvery(SAVE_TEST, saveTest);
}
function* watchGetTestList() {
    yield takeEvery(GET_TEST_LIST, getTestList);
}

export default function* testSaga() {
    yield all([
        saveTest(),
        watchSaveTest(),
        getTestList(),
        watchGetTestList()
    ])
}