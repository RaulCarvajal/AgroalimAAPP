import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pregunta, preguntaReq, pregunta_tabla_admin } from '../interfaces/preguntas.interface';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(
    private http:HttpClient
  ) { }

  saveOne(pregunta:preguntaReq){
    return this.http.post<pregunta>(`${api.path}preguntas`,pregunta);
  }

  getPreguntasDashAdmin(id:number){
    return this.http.get<pregunta_tabla_admin[]>(`${api.path}admin_preguntas/${id}`)
  }

  getPreguntasUsuarios(id:number){
    return this.http.get<any>(`${api.path}preguntasusuarios/${id}`)
  }

  getOne(id:number){
    return this.http.get<pregunta>(`${api.path}preguntas/${id}`);
  }

  updatePregunta(pregunta:pregunta){
    return this.http.put<pregunta>(`${api.path}preguntas/${pregunta.id_pregunta}`,pregunta);
  }

}
