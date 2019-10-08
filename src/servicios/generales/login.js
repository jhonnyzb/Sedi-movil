const axios = require('axios');
 
export function login() {
    return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}
