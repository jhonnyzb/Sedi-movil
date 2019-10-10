const axios = require('axios');
 
export function login(email, password ) {
    let usuario = {
        email: email,
        password: password
    }
    return axios.post('http://10.131.10.33/api/login', usuario)
}
