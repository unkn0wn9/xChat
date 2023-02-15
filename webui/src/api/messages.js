import axios from 'axios'
import { base_url } from './config'

const send = (msg) => {
    return axios({
        method: 'post',
        url: `${base_url}/messages`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
            msg
        }
    })
};

export {
    send
}