import { url_base } from '../../config/configuraciones';
const axios = require('axios');


export function consultaLicencias(header) {
    return axios.get(url_base + '/superAdmin/showLicense', header)

}