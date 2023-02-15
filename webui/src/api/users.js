import axios from 'axios'
import { base_url } from './config'

const register = (email, password) => {
    return axios({
        method: 'post',
        url: `${base_url}/users`,
        data: {
            email,
            password
        }
    })
};

export {
    register
}