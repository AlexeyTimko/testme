import { all } from 'redux-saga/effects'
import testSaga from './tests/sagas';
import authSaga from './auth/sagas';

export default function* rootSaga() {
    yield all([
        testSaga(),
        authSaga()
    ])
}