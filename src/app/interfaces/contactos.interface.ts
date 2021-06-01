export interface contacto {
    id_contacto: number,
    apellidos: string,
    contrasena: string,
    email: string,
    estado: boolean
    estatus_registro: number,
    nombre_usuario: string,
    nombres: string,
    telefono: string,
    tipo_usuario: string,
    fk_id_empresa: number,
    fk_id_puesto: number
}