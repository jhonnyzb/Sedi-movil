import { url_base } from '../../config/configuraciones';
const axios = require('axios');
 
export function login(email, password ) {
    let usuario = {
        email: email,
        password: password
    }
    return axios.post( url_base + '/api/login', usuario)
}
