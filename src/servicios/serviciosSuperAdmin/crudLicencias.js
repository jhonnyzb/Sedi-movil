import { url_base } from '../../config/configuraciones';
const axios = require('axios');


export function consultaLicencias(header) {
    return axios.get(url_base + '/superAdmin/showLicense', header)

}


export function consultaLicenciaCliente(clientId, header) {
    let cliente = {
        clientId :clientId
    }

    return axios.post(url_base + '/superAdmin/licenseByClient', cliente, header)

}

export function guardarLicencia(clienteId,periodo,numeroUsuarios,precio,fechaInicio, header) {
    let licencia = {
        clientId:clienteId,
        period:periodo,
        licensesNumber:numeroUsuarios,
        licensesCost:precio,
        startDate: fechaInicio
    }

    return axios.post(url_base + '/superAdmin/licenseByClient', licencia, header)

}