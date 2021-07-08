import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { encuesta, encuesta_tabla_admin, encuesta_tabla_user } from '../interfaces/encuestas.interface';
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
}
