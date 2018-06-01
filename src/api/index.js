import axios from 'axios';

const baseURL = 'http://test-me.com/api';

export default {
    register: data => axios.post(`${baseURL}/user`, data)
        .then(res => res.data)
        .catch(err => {
            throw err;
        }),
    logIn: data => axios.post(`${baseURL}/user/auth`, data)
        .then(res => res.data)
        .catch(err => {
            throw err;
        }),
    saveTest: data => axios.post(`${baseURL}/test`, data)
        .then(res => res.data)
        .catch(err => {
            throw err;
        }),
    getTestList: () => axios.get(`${baseURL}/test`)
        .then(res => res.data)
        .catch(err => {
            throw err;
        })
}