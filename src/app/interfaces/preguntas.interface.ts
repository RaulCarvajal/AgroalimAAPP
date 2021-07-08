export interface preguntaReq {
    id_pregunta: number,
    pregunta: string,
    estatus: boolean,
    fecha_registro: string,
    fk_id_encuesta: number,
    opciones: opcion[]
}

export interface opcion {
    id_opcion: number,
    fk_id_pregunta: number,
    texto: string,
    estatus: boolean
}

export interface pregunta {
    id_pregunta: number,
    pregunta: string,
    estatus: boolean,
    fecha_registro: string,
    fk_id_encuesta: number
}

export interface pregunta_tabla_admin {
    id_pregunta: number,
    pregunta: string,
    fecha_registro: string,
    estatus: boolean,
    preguntas: string
}

export interface preguntas_usuarios {
    id_pregunta: number, 
    pregunta: string, 
    fecha_registro: string, 
    opciones: string
}