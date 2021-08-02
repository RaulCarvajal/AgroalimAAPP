import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { estado } from '../interfaces/estadosmunicipios.interface';
import { organizacion } from '../interfaces/organizacionesempresa.interface';
import { puesto } from '../interfaces/puestos.interface';
import { sector_atendido } from '../interfaces/sectoresatendidos.interface';
import { municipio, sede } from '../interfaces/sedes.interface';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(
    private http:HttpClient
  ) { }

  getCatalogoSectoresAtendidos(){
    return this.http.get<sector_atendido[]>(`${api.path}cat_sectores_atendidosUser`);
  }

  getCatalogoPuestos(){
    return this.http.get<puesto[]>(`${api.path}cat_puestosUser`);
  }

  getCatalogoOrganizacionesEmpresariales(){
    return this.http.get<organizacion[]>(`${api.path}cat_org_empresarial`);
  }

  getTiposSedes(){
    return this.http.get<sede[]>(`${api.path}ct_sedes`);
  }

  getEstadosMex(){
    return this.http.get<estado[]>(`${api.path}estados`);
  }

  getMunicipiosEstados(idestado:number){
    return this.http.get<municipio[]>(`${api.path}mun/${idestado}`);
  }
}
