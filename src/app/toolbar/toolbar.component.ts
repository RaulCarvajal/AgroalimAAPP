import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  logeado:boolean = false;
  sysadmin:boolean = false;
  admin:boolean = false;
  colaborador:boolean = false;

  myname:string = "";
  myrole:string = "";

  constructor(
    private as:AuthService,
    private apc:AppComponent
  ) { }

  ngOnInit(): void {
    this.logeado = this.as.isLoged();
    if(this.logeado){
      this.typeUser();
      this.getMyName();
    }
  }

  open(){
    this.apc.open()
  }

  typeUser(){
    if(this.as.getTipoUsuario()==null){
      this.logeado = false;
    }else if(this.as.getTipoUsuario()==="sysadmin"){
      this.sysadmin = true;
      this.admin = false;
      this.colaborador = false;
    }else if(this.as.getTipoUsuario()==="admin"){
      this.sysadmin = false;
      this.admin = true;
      this.colaborador = false;
    }else if(this.as.getTipoUsuario()==="colaborador"){
      this.sysadmin = false;
      this.admin = false;
      this.colaborador = true;
    }else{
      this.logeado = false;
    }
  }
  getMyName(){
    if(this.as.getContactoName()){
      this.myname = this.as.getContactoName();
      this.myrole = this.as.getTipoUsuario();
    }else{
      this.logeado = false
    }
  }

  closeSession(){
    this.as.closeSession();
  }

}
