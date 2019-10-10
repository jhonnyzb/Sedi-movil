const axios = require('axios');

export function consultaClientes() {
      return axios.get('http://10.131.10.32/superAdmin/showClient')     
}

export function crearCliente(tdocumento, ndocumento, nombreCliente,telefono, email) {
      let cliente = {
            document_type_id: tdocumento,
            document_number:ndocumento,
            name: nombreCliente,
            phone: telefono,
            email:  email
      }
      return axios.post('http://10.131.10.32/superAdmin/createClient', cliente)     
}
