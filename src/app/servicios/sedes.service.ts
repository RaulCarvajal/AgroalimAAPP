import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sede } from '../interfaces/sedes.interface';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class SedesService {

  constructor(
    private http:HttpClient
  ) { }

  getFull(){
    return this.http.get<sede[]>(`${api.path}cat_sedes`);
  }

  updateOne(sede:sede){
    return this.http.put<sede>(`${api.path}cat_sedes/${sede.id_cat_sede}`,sede);
  }

  saveOne(sede:any){
    return this.http.post(`${api.path}cat_sedes`,sede);
  }
}
