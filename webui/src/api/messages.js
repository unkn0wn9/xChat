import axios from 'axios'

const send = (msg) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3001/messages',
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