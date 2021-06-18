import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { opcion } from '../interfaces/preguntas.interface';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {

  constructor(
    private http:HttpClient
  ) { }

  getOpcionesPorPregunta(fkidp:number){
    return this.http.get<opcion[]>(`${api.path}admin_opciones/${fkidp}`);
  }

  update(opcion:opcion){
    return this.http.put<opcion>(`${api.path}admin_opciones/${opcion.id_opcion}`,opcion);
  }

  saveOpcion(opcion:opcion){
    return this.http.post<opcion>(`${api.path}admin_opciones`,opcion);
  }

}
