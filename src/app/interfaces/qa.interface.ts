export interface qa {
    fk_id_contacto: number,
    fk_id_empresa: number,
    fk_id_opcion: number,
    fk_id_pregunta: number,
    fk_id_encuesta: number,
    fecha_respuesta: string
}

export interface qa_text{
    id_respuesta: number,
    contacto: string,
    fecha_respuesta: string,
    opcion: string,
    pregunta: string
}

export interface qa_chart {
    texto: string,
    valor: number
}

export interface qa_chart_res {
    val : qa_chart[]
}

export interface qa_radar {
    fecha_respuesta: string | undefined,
    id_respuesta: number | undefined,
    opcion: string | undefined,
    pregunta: string,
    valor: number
}