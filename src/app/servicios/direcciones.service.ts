import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constructor(
    private http:HttpClient
  ) { }

  getDireccionesByEmpresa(idempresa:number){
    return this.http.get<any[]>(`${api.path}getDirecciones/${idempresa}`);
  }

  save(data:any){
    return this.http.post(`${api.path}direccion`,data);
  }

}
