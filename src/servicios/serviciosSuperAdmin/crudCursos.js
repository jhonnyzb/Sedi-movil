const axios = require('axios');


export function consultaCursosAdmin(header) {
    return axios.get('http://10.131.10.33/superAdmin/getClass', header)

}

export function consultaCursosDetalles(idCurso, header) {
    let idCursoObjeto = {
        "classId": idCurso
    }
    return axios.post('http://10.131.10.33/admin/classDetail', idCursoObjeto, header)

}


export function guardarCurso(nombreCurso, descripcion, header) {
    let curso = {
        className: nombreCurso,
        description: descripcion
    }
    return axios.post('http://10.131.10.33/superAdmin/createClass', curso, header)
}

export function crearModulo_(idCurso, name, descripcion, orden, header) {
    let modulo = {
        classId:idCurso,
        name:name,
        order:orden,
        description: descripcion
    }
    return axios.post('http://10.131.10.33/superAdmin/createModule', modulo, header)
}



export function guardarSeccion(nombreSeccion, idModulo, orden, descripcion, urlVideo, tipoArchivo, header) {
    let seccion = {
        name:nombreSeccion,
        moduleId:idModulo,
        order: orden,
        description: descripcion,
        fileValue: urlVideo,
        fyleTypeId: Number(tipoArchivo) 
    }
    alert(JSON.stringify(seccion))
    return axios.post('http://10.131.10.33/superAdmin/createSection', seccion, header)
}


export function eliminarCurso(cursoId, header) {

    return axios.delete('http://10.131.10.33/superAdmin/deleteClass', { headers: { Authorization: 'Bearer ' + header }, data: { classId: cursoId } })

}