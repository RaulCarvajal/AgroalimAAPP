import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { encuesta, encuesta_tabla_admin, encuesta_tabla_user } from '../interfaces/encuestas.interface';
import { qa, qa_text } from '../interfaces/qa.interface';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(
    private http:HttpClient
  ) { }

  saveOne(encuesta:any){
    return this.http.post<encuesta>(`${api.path}encuestas`,encuesta);
  }

  getAllEncuestasAdministratorTable(){
    return this.http.get<encuesta_tabla_admin[]>(`${api.path}admin_encuestas`);
  }

  getAllEncuestaUsersTable(){
    return this.http.get<encuesta_tabla_user[]>(`${api.path}encuestasusuarios`);
  }

  getOneById(id:number){
    return this.http.get<encuesta>(`${api.path}admin_encuestas/${id}`);
  }

  update(encuesta:encuesta){
    return this.http.put<encuesta>(`${api.path}admin_encuestas/${encuesta.id_encuesta}`,encuesta); 
  }

  async saveQa(qa:qa){
    return await this.http.post(`${api.path}respuestasUsuarios`, qa).toPromise();
  }

  tieneRespuestas(fk_id_empresa:number, fk_id_encuesta:number){
    return this.http.get<qa[]>(`${api.path}tienerespuestas?fk_id_empresa=${fk_id_empresa}&fk_id_encuesta=${fk_id_encuesta}`);
  }
  
  getRespuestas(id_encuesta:number, id_empresa:number){//
    return this.http.get<qa_text[]>(`${api.path}getrespestas?id_encuesta=${id_encuesta}&id_empresa=${id_empresa}`);
  }

  async getResultadosGenerales(id_respuesta:number){
    return await this.http.get(`${api.path}resultadosgeneralesporidrespuesta?id_respuesta=${id_respuesta}`).toPromise();
  }
}
