import { all } from 'redux-saga/effects'
import testSaga from './tests/sagas';

export default function* rootSaga() {
    yield all([
        testSaga()
    ])
}