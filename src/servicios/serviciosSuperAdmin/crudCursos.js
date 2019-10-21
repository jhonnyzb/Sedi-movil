import { url_base } from '../../config/configuraciones';
const axios = require('axios');


export function consultaCursosAdmin(header) {
    return axios.get(url_base + '/superAdmin/getClass', header)

}

export function consultaCursosDetalles(idCurso, header) {
    let idCursoObjeto = {
        "classId": idCurso
    }
    return axios.post(url_base + '/admin/classDetail', idCursoObjeto, header)

}

export function guardarCurso(nombreCurso, descripcion, header) {
    let curso = {
        className: nombreCurso,
        description: descripcion
    }
    return axios.post(url_base + '/superAdmin/createClass', curso, header)
}


export function editarCurso_(nombreCurso, descripcion, idCurso, header) {
    let curso = {
        className: nombreCurso,
        description: descripcion,
        classId: idCurso
    }
    return axios.put(url_base + '/superAdmin/updateClass', curso, header)

}

export function crearModulo_(idCurso, name, descripcion, orden, header) {
    let modulo = {
        classId: idCurso,
        name: name,
        order: orden,
        description: descripcion
    }
    return axios.post(url_base + '/superAdmin/createModule', modulo, header)
}

export function actualizarModulo(IdCurso, NombreModulo, descripcion, ordenModulo, idModulo, header) {
    let modulo = {
        classId: IdCurso,
        name: NombreModulo,
        description: descripcion,
        order: ordenModulo,
        moduleId: idModulo
    }
    return axios.put(url_base + '/superAdmin/updateModule', modulo, header)

}


export function eliminarModulo(IdModulo, token) {

    return axios.delete(url_base + '/superAdmin/deleteModule', { headers: { Authorization: 'Bearer ' + token }, data: { moduleId: IdModulo } })

}




export function guardarSeccion(nombreSeccion, idModulo, orden, descripcion, urlVideo, tipoArchivo, header) {
    let seccion = {
        name: nombreSeccion,
        moduleId: Number(idModulo),
        order: Number(orden),
        description: descripcion,
        fileValue: urlVideo,
        fileTypeId: Number(tipoArchivo)
    }
    return axios.post(url_base + '/superAdmin/createSection', seccion, header)
}

export function consultarSecciones(header) {

    return axios.get(url_base + '/superAdmin/getSection', header)

}

export function consultarSeccionIndividual(idseccion, header) {


    return axios.post(url_base + '/superAdmin/showSection', { sectionId: idseccion }, header)

}

export function actualizarSeccion(nombreSeccion, idModulo, orden, descripcion, idseccion, header) {
    let seccion = {
        name: nombreSeccion,
        moduleId: idModulo,
        order: orden,
        description: descripcion,
        sectionId: idseccion
    }
    return axios.put(url_base + '/superAdmin/updateSection', seccion, header)

}

export function eliminarSeccion(idseccion, token) {

    return axios.delete(url_base + '/superAdmin/deleteSection', { headers: { Authorization: 'Bearer ' + token }, data: { sectionId: idseccion } })

}

export function eliminarCurso(cursoId, header) {

    return axios.delete(url_base + '/superAdmin/deleteClass', { headers: { Authorization: 'Bearer ' + header }, data: { classId: cursoId } })

}



export function obtenerMetodologias(header) {

    return axios.get(url_base + '/superAdmin/getMethodology', header)

}

export function guardarMetodologia(nombreMetodologia, valorMaximoMetodologia, header) {
    let metodologia = {
        name: nombreMetodologia,
        maxValue: valorMaximoMetodologia
    }
    return axios.post(url_base + '/superAdmin/createMethodology', metodologia, header)
}

export function guardarQuiz(tipoMetodologia, idTipo, idModulo, minimoValorRequerido, descripcion, header) {
    let quiz = {
        methodologyId:tipoMetodologia,
        typeId:idTipo,
        moduleId:idModulo,
        minValueRequired: minimoValorRequerido,
        description: descripcion
    }
    return axios.post(url_base + '/superAdmin/createExam', quiz, header)
}

export function guardarPreguntasQuiz(idExamen, pregunta, peso, respuestas, header) {
    let preguntaQuiz = {
        examId:idExamen,
        description:pregunta,
        quantity:peso,
        answers: respuestas
    }
    return axios.post(url_base + '/superAdmin/createQuestionAnswers', preguntaQuiz, header)
}

export function obtenerCuestionario(idExamen,header) {
    let cuestionario = {
        examId:idExamen, 
    }
    return axios.post(url_base + '/user/detailExam', cuestionario, header)
}

export function eliminarPregunta(idPregunta, header) {

    return axios.delete(url_base + '/superAdmin/deleteQuestion', { headers: { Authorization: 'Bearer ' + header }, data: { questionId: idPregunta } })

}
