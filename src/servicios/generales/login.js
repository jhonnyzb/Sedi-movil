const axios = require('axios');

var login = {
    login: function(){
        return axios.get('https://jsonplaceholder.typicode.com/todos/1')
    }
}

export {login as default}