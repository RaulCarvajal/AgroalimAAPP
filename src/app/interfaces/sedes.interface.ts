export interface sede {
    id_cat_sede : number,
    tipo_sede : string,
    estado : boolean
}

export interface municipio { 
    id_municipio: number,
    nombre_municipio: string,
    fk_id_estado: number
}