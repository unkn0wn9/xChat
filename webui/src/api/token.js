import axios from 'axios'

const login = (email, password) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3001/token',
        data: {
            email,
            password
        }
    })
};

export {
    login
}