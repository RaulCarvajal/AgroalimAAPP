import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empresa } from '../interfaces/empresas.interface';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(
    private http:HttpClient
  ) { }

  getFull(){
    return this.http.get<empresa[]>(`${api.path}admin_empresas`)
  }

  getFullOne(id:string){
    return this.http.get<empresa>(`${api.path}admin_empresas/${id}`)
  }

  save(data:empresa){
    return this.http.post<empresa>(`${api.path}empresas`,data)
  }

  getByRfc(rfc:string){
    return this.http.get<empresa[]>(`${api.path}empresasPorRfc?rfc=${rfc}`)
  }
}
