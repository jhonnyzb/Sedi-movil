import { url_base } from '../../config/configuraciones';
const axios = require('axios');


export function consultaCursosAdmin(header) {
    return axios.get( url_base + '/superAdmin/getClass', header)

}

export function consultaCursosDetalles(idCurso, header) {
    let idCursoObjeto = {
        "classId": idCurso
    }
    return axios.post( url_base + '/admin/classDetail', idCursoObjeto, header)

}


export function guardarCurso(nombreCurso, descripcion, header) {
    let curso = {
        className: nombreCurso,
        description: descripcion
    }
    return axios.post(url_base + '/superAdmin/createClass', curso, header)
}

export function crearModulo_(idCurso, name, descripcion, orden, header) {
    let modulo = {
        classId:idCurso,
        name:name,
        order:orden,
        description: descripcion
    }
    return axios.post( url_base + '/superAdmin/createModule', modulo, header)
}

export function guardarSeccion(nombreSeccion, idModulo, orden, descripcion, urlVideo, tipoArchivo, header) {
    let seccion = {
        name:nombreSeccion,
        moduleId: Number(idModulo),
        order: Number(orden) ,
        description: descripcion,
        fileValue: urlVideo,
        fileTypeId: Number(tipoArchivo) 
    }
    //alert(JSON.stringify(seccion))
    return axios.post( url_base + '/superAdmin/createSection', seccion, header)
}

export function consultarSecciones(header) {
    
    return axios.get( url_base + '/superAdmin/getSection', header)

}

export function consultarSeccionIndividual(idseccion, header) {
    
    
    return axios.post( url_base + '/superAdmin/showSection',{sectionId: idseccion}, header)

}

export function actualizarSeccion(nombreSeccion,idModulo, orden, descripcion,idseccion, header) {
    let seccion ={
        name: nombreSeccion,
        moduleId:idModulo,
        order:orden,
        description:descripcion,
        sectionId: idseccion
    }
    return axios.put( url_base + '/superAdmin/updateSection',seccion, header)

}

export function eliminarSeccion(idseccion, token) {

    return axios.delete(url_base + '/superAdmin/deleteSection', { headers: { Authorization: 'Bearer ' + token }, data: { sectionId: idseccion } })

}

export function eliminarCurso(cursoId, header) {

    return axios.delete(url_base + '/superAdmin/deleteClass', { headers: { Authorization: 'Bearer ' + header }, data: { classId: cursoId } })

}



export function obtenerMetodologias(header) {
    
    return axios.get( url_base + '/superAdmin/getMethodology', header)

}