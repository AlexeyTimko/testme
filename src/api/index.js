import axios from 'axios';
import config from '../app/config';

const baseURL = `${config.host}/api`;

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
    deleteTest: data => axios.delete(`${baseURL}/test/${data.id}`, {
        params: {
            token: data.token
        }
    })
        .then(respHandler)
        .catch(err => {
            throw err;
        }),
    getTestList: params => {
        let url = `${baseURL}/test`;
        return axios.get(url, {params})
            .then(respHandler)
            .catch(err => {
                throw err;
            });
    }
}