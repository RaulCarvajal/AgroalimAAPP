import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contacto } from '../interfaces/contactos.interface';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(
    private http:HttpClient
  ) { }

  getFull(){
    return this.http.get<contacto[]>(`${api.path}admin_contactos`);
  }

  updateOne(contacto:contacto){
    return this.http.put<contacto>(`${api.path}admin_contactos/${contacto.id_contacto}`,contacto)
  }

  getFullOne(id:number){
    return this.http.get<contacto>(`${api.path}admin_contactos/${id}`);
  }
}
