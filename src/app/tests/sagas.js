import Api from '../../api';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import {
    ANSWER_TEST, ANSWER_TEST_RESULT, DELETE_TEST, EDIT_FORM_CLOSE,
    GET_TEST_LIST,
    GET_TEST_LIST_FAILED,
    GET_TEST_LIST_SUCCEEDED,
    LOAD_TEST, LOAD_TEST_FAILED, LOAD_TEST_SUCCEEDED, NEXT_PAGE, NEXT_PAGE_LOADED, NEXT_PAGE_LOADING,
    OPEN_FLASH_MESSAGE, RESET_TEST,
    SAVE_TEST,
    SAVE_TEST_FAILED,
    SAVE_TEST_SUCCEEDED, SEARCH
} from "../actionTypes";

function* showError(error) {
    yield put({
        type: OPEN_FLASH_MESSAGE,
        color: 'danger',
        payload: error.message
    });
}
function* showMessage(message) {
    yield put({
        type: OPEN_FLASH_MESSAGE,
        color: 'success',
        payload: message
    });
}

function* saveTest(action) {
    try {
        const data = yield call(Api.saveTest, action.payload);
        yield put({type: SAVE_TEST_SUCCEEDED, payload: data});
        yield call(showMessage, 'Test saved');
        yield put({type: EDIT_FORM_CLOSE});
    } catch (error) {
        yield put({type: SAVE_TEST_FAILED, error});
        yield call(showError, error);
    }
}

function* getTestList(action) {
    try {
        const data = yield call(Api.getTestList, action.payload);
        yield put({type: GET_TEST_LIST_SUCCEEDED, payload: data});
    } catch (error) {
        yield put({type: GET_TEST_LIST_FAILED, error});
        yield call(showError, error);
    }
}

function* watchSaveTest() {
    yield takeEvery(SAVE_TEST, saveTest);
}
function* watchGetTestList() {
    yield takeEvery(GET_TEST_LIST, getTestList);
}

function* loadTest(action) {
    try {
        yield put({type: RESET_TEST});
        const test = yield call(Api.loadTest, action.payload);
        yield put({type: LOAD_TEST_SUCCEEDED, payload: test});
    } catch (error) {
        yield put({type: LOAD_TEST_FAILED, error});
        yield call(showError, error);
    }
}

function* watchLoadTes() {
    yield takeEvery(LOAD_TEST, loadTest);
}

function* answerTest(action) {
    try {
        const test = yield call(Api.answerTest, action.payload);
        yield put({type: ANSWER_TEST_RESULT, payload: test});
    } catch (error) {
        yield call(showError, error);
    }
}

function* watchAnswerTes() {
    yield takeEvery(ANSWER_TEST, answerTest);
}

function* search(action) {
    try {
        yield put({type: GET_TEST_LIST, payload: action.payload});
    } catch (error) {
        yield call(showError, error);
    }
}

function* watchSearch() {
    yield takeEvery(SEARCH, search);
}

function* deleteTest(action) {
    try {
        yield call(Api.deleteTest, action.payload);
        yield put({type: GET_TEST_LIST, payload: action.payload});
    } catch (error) {
        yield call(showError, error);
    }
}

function* watchDeleteTest() {
    yield takeEvery(DELETE_TEST, deleteTest);
}

function* nextPage(action) {
    try {
        yield put({type: NEXT_PAGE_LOADING});
        const data = yield call(Api.getTestList, action.payload);
        yield put({type: NEXT_PAGE_LOADED, payload: data});
    } catch (error) {
        yield call(showError, error);
    }
}

function* watchNextPage() {
    yield takeEvery(NEXT_PAGE, nextPage);
}

export default function* testSaga() {
    yield all([
        watchSaveTest(),
        watchLoadTes(),
        watchAnswerTes(),
        watchGetTestList(),
        watchSearch(),
        watchDeleteTest(),
        watchNextPage(),
    ])
}