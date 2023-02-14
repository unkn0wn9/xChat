import axios from 'axios'

const register = (email, password) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3001/users',
        data: {
            email,
            password
        }
    })
};

export {
    register
}