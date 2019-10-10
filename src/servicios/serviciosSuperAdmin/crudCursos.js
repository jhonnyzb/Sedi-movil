const axios = require('axios');


export function consultaCursosAdmin(header) {
        return axios.get('http://10.131.10.33/superAdmin/getClass', header)     
         
}


export function guardarCurso(nombreCurso, descripcion, estado, header) {
    let curso = {
        className: nombreCurso,
        description: descripcion,
        statusId: estado
    }
    return axios.post('http://10.131.10.33/superAdmin/createClass', curso, header)     
}



export function eliminarCurso(cursoId, header) {
    
   return axios.delete('http://10.131.10.33/superAdmin/deleteClass', { headers:{ Authorization: 'Bearer ' + header }, data: {classId: cursoId} })          
    
}