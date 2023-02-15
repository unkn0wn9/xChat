import axios from 'axios'
import { base_url } from './config'

const login = (email, password) => {
    return axios({
        method: 'post',
        url: `${base_url}/token`,
        data: {
            email,
            password
        }
    })
};

export {
    login
}