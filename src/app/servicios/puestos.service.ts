import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { puesto } from '../interfaces/puestos.interface';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class PuestosService {

  constructor(
    private http:HttpClient
  ) { 

  }

  getFull(){
    return this.http.get<puesto[]>(`${api.path}cat_puestos`);
  }

  updateOne(puesto:puesto){
    return this.http.put<puesto>(`${api.path}cat_puestos/${puesto.id_puesto}`,puesto);
  }

  saveOne(puesto:any){
    return this.http.post(`${api.path}cat_puestos`,puesto);
  }

  getFullOne(id:number){
    return this.http.get<puesto>(`${api.path}cat_puestos/${id}`);
  }

}
