import Api from '../../api';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import {
    LOG_IN, LOG_IN_FAILED, LOG_IN_SUCCEEDED, OPEN_FLASH_MESSAGE, REGISTER, REGISTER_FAILED,
    REGISTER_SUCCEEDED
} from "../actionTypes";

function* showError(error) {
    yield put({
        type: OPEN_FLASH_MESSAGE,
        color: 'danger',
        payload: error.message
    });
}

function* register(action) {
    try {
        const data = yield call(Api.register, action.payload);
        if(data.result === 'success'){
            yield put({type: REGISTER_SUCCEEDED, payload: data});
            yield put({
                type: OPEN_FLASH_MESSAGE,
                color: 'success',
                payload: 'Registration successful'
            });
            yield put({type: LOG_IN, payload: {
                email: action.payload.email,
                password: action.payload.password
            }});
        }else{
            yield put({type: REGISTER_FAILED, error: data.error});
            yield call(showError, {message: data.error});
        }
    } catch (error) {
        yield put({type: REGISTER_FAILED, error});
        yield call(showError,error);
    }
}

function* watchRegister() {
    yield takeEvery(REGISTER, register);
}

function* logIn(action) {
    try {
        const data = yield call(Api.logIn, action.payload);
        if(data.result === 'success'){
            yield put({type: LOG_IN_SUCCEEDED, payload: data.user});
        }else if(!action.payload.token){
            yield put({type: LOG_IN_FAILED, error: data.error});
            yield call(showError, {message: data.error});
        }
    } catch (error) {
        yield put({type: LOG_IN_FAILED, error});
        yield call(showError,error);
    }
}

function* watchLogIn() {
    yield takeEvery(LOG_IN, logIn);
}

export default function* authSaga() {
    yield all([
        watchRegister(),
        watchLogIn()
    ])
}