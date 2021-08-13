import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { api } from "./server.path";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private rt: Router
  ) { }

  logon(data:any){
    return this.http.post<any>(`${api.path}auth`,data);
  }
  logonsysadmin(data:any){
    return this.http.post<any>(`${api.path}authAdmin`,data);
  }
  
  /*getById(){
    return this.http.get<any>(`http://${uri_port.url}:${uri_port.port}/api/contactos/${this.getContactoId()}`);
  }
  updateSession(){
    this.getById().subscribe(
      res => {
        sessionStorage.setItem('contacto' ,JSON.stringify(res));
      },
      err => {
        console.error(err);
      }
    );
  }*/

  isLoged():boolean{
    if(!sessionStorage.length){
      this.rt.navigateByUrl("logon")
      return false;
    }else{
      return true;
    }
  }

  saveSession(res : any){
    sessionStorage.setItem('contacto' ,JSON.stringify(res));
    //this.rt.navigateByUrl("/")
    window.location.reload();
  }

  getContactoId():number{
    return JSON.parse(sessionStorage.getItem('contacto')!).id_contacto;
  }
  getContactoName():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).nombres;
  }
  getUsername():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).nombre_usuario;
  }
  getPassword():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).contraseña;
  }
  getTipoUsuario():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).tipo_usuario;
  }

  getRegStatus():number{
    return JSON.parse(sessionStorage.getItem('contacto')!).estatus_registro;
  }
  
  getEmpresaId():number{
    return JSON.parse(sessionStorage.getItem('contacto')!).fk_id_empresa;
  }

  getSysAdminId():number{
    return JSON.parse(sessionStorage.getItem('contacto')!).id_administrador;
  }
  getSysAdminNombres():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).nombres;
  }
  getSysAdminApellidos():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).apellidos;
  }
  getSysAdminEmpresa():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).empresa;
  }
  getSysAdminUsuario():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).usuario;
  }
  getSysAdminPassword():string{
    return JSON.parse(sessionStorage.getItem('contacto')!).contrasena;
  }

  closeSession(){
    sessionStorage.clear();
    window.location.reload();
  }

  sysadminAuth():boolean{
    if(this.getTipoUsuario()==="sysadmin"){
      return true;
    }else{
      this.rt.navigateByUrl("/403_Forbidden")
      return false;
    }
  }
}
