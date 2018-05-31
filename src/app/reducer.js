import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {tests} from "./tests/reducers";

export default combineReducers({
    routing: routerReducer,
    tests
})