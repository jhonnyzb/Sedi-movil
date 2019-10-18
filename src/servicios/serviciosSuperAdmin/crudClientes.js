import { url_base } from '../../config/configuraciones';
const axios = require('axios');

export function consultaClientes(header) {
      return axios.get( url_base + '/superAdmin/showClient', header)     
}

export function crearCliente(tdocumento, ndocumento, nombreCliente,telefono, email, header) {
      let cliente = {
            document_type_id: tdocumento,
            document_number:ndocumento,
            name: nombreCliente,
            phone: telefono,
            email:  email
      }
      return axios.post(url_base + '/superAdmin/createClient', cliente, header)
}

export function actualizarCliente(tdocumento, ndocumento, nombreCliente,telefono, email, idCliente, header) {
      let cliente = {
            document_type_id: tdocumento,
            document_number:ndocumento,
            name: nombreCliente,
            phone: Number(telefono),
            email:  email,
            client_id: idCliente
      }
      //alert(JSON.stringify(cliente))
      return axios.post(url_base + '/superAdmin/updateClient', cliente, header)
}


export function eliminarCliente_(idCliente, headers) {

      return axios.post(url_base + '/superAdmin/disableClient', { client_id: idCliente }, headers)
  
  }
  