import Api from '../../api';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import {LOG_IN, LOG_IN_FAILED, LOG_IN_SUCCEEDED, REGISTER, REGISTER_FAILED, REGISTER_SUCCEEDED} from "../actionTypes";

function* register(action) {
    try {
        const data = yield call(Api.register, action.payload);
        yield put({type: REGISTER_SUCCEEDED, payload: data});
    } catch (error) {
        yield put({type: REGISTER_FAILED, error});
    }
}

function* watchRegister() {
    yield takeEvery(REGISTER, register);
}

function* logIn(action) {
    try {
        const data = yield call(Api.logIn, action.payload);
        yield put({type: LOG_IN_SUCCEEDED, payload: data});
    } catch (error) {
        yield put({type: LOG_IN_FAILED, error});
    }
}

function* watchLogIn() {
    yield takeEvery(LOG_IN, logIn);
}

export default function* authSaga() {
    yield all([
        register(),
        watchRegister(),
        logIn(),
        watchLogIn()
    ])
}