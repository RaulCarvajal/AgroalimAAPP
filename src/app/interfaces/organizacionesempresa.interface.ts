export interface organizacionesempresa {
    id_organizacon : number,
    organizacion : string
}

export interface organizacion {
    id_cat_oe : number,
    nombre_orgemp : string,
    estatus : boolean
}

export interface org_emp {
    fk_id_org: number,
    fk_id_empresa: number,
    id_orgs_emp: number
}