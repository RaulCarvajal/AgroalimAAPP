import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  estatusRegistro:boolean = false; //False si esta en registro de empresa, True en registro de usuario admin

  constructor(
    private as:AuthService,
    private rt:Router
  ) {
  }

  ngOnInit(): void {
    this.existsEmpresaId();
    this.as.isLoged()?this.rt.navigateByUrl("/"):this.rt.navigateByUrl("/registro");
  }

  public guardarContacto():void{
    this.estatusRegistro = true;
  }

  existsEmpresaId(){
    if(window.localStorage.getItem("ridne")){
      this.guardarContacto();
    }
  }



}
