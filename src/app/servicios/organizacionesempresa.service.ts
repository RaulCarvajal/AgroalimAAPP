import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { organizacionesempresa } from '../interfaces/organizacionesempresa.interface';
import { api } from "./server.path";
@Injectable({
  providedIn: 'root'
})
export class OrganizacionesempresaService {

  constructor(
    private http:HttpClient
  ) { }

  getOrganizacionesDeEmpresa(idempresa:number){
    return this.http.get<organizacionesempresa[]>(`${api.path}OrganizacionesEmpresa/${idempresa}`);
  }

  async saveOrganizacionEmpresa(data:any){
    return await this.http.post(`${api.path}orgs_emp`,data).toPromise()
  }

}
