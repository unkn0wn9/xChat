import axios from 'axios'
import { base_url } from './config'

const recharge = (key) => {
    return axios({
        method: 'post',
        url: `${base_url}/cards`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
            key
        }
    })
};

export {
    recharge
}