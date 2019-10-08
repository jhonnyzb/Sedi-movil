const axios = require('axios');
 
export function consultaCursosUsuario() {
    return axios.get('https://reqres.in/api/users?page=2')
}
