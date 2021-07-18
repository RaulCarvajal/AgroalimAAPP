import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { puesto } from '../interfaces/puestos.interface';
import { sector_atendido } from '../interfaces/sectoresatendidos.interface';
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
}
