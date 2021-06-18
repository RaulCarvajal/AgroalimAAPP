export interface encuesta {
    id_encuesta :  number,
    nombre : string,
    descripcion : string,
    estatus : boolean,
    eversion : number,
    fecha_registro : string,
    fecha_vigencia : string,
    fk_id_administrador : number
}

export interface encuesta_tabla_admin {
    estatus: boolean,
    eversion: number,
    fecha_registro: string,
    id_encuesta: number,
    nombre: string,
    preguntas: number,
}