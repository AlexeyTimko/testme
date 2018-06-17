import axios from 'axios';

const baseURL = 'http://test-me.com/api';

const respHandler = res => {
    if(res.data.result && res.data.result === 'error'){
        throw res.data;
    }
    return res.data;
};

export default {
    register: data => axios.post(`${baseURL}/user`, data)
        .then(respHandler)
        .catch(err => {
            throw err;
        }),
    logIn: data => axios.post(`${baseURL}/user/auth`, data)
        .then(respHandler)
        .catch(err => {
            throw err;
        }),
    saveTest: data => axios.post(`${baseURL}/test`, data)
        .then(respHandler)
        .catch(err => {
            throw err;
        }),
    loadTest: id => axios.get(`${baseURL}/test/${id}`, {})
        .then(respHandler)
        .catch(err => {
            throw err;
        }),
    answerTest: data => axios.post(`${baseURL}/test/answer`, data)
        .then(respHandler)
        .catch(err => {
            throw err;
        }),
    getTestList: () => axios.get(`${baseURL}/test`)
        .then(respHandler)
        .catch(err => {
            throw err;
        })
}