import axios from 'axios';

const baseURL = 'http://localhost:8000';

export default {
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