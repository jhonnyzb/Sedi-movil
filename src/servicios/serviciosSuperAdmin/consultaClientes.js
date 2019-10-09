const axios = require('axios');

export function consultaClientes() {
      return axios.get('http://10.131.10.32/superAdmin/showClient')     
}
