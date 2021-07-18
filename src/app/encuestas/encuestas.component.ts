import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { encuesta_tabla_admin } from '../interfaces/encuestas.interface';
import { AuthService } from '../servicios/auth.service';
import { EncuestasService } from '../servicios/encuestas.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  searchString:string="";
  cargando_tabla:boolean = true;
  encuestas:encuesta_tabla_admin[]=[];

  constructor(
    private es:EncuestasService,
    private rt:Router,
    private as:AuthService
  ) {
    this.getEncuestasTableAdmin();
   }

  ngOnInit(): void {
    this.as.sysadminAuth();
  }

  getEncuestasTableAdmin(){
    this.es.getAllEncuestasAdministratorTable().subscribe(
      res => {
        this.encuestas = res;
        this.cargando_tabla = false;
      },
      err => console.log(err)
    );
  }

  search(){
    if(this.searchString){
      let regex = new RegExp(this.searchString);
      this.encuestas = this.encuestas.filter( c => c.nombre.match(regex))
    }else{
      this.getEncuestasTableAdmin()
    }
  }

  goDetail(id:number){
    this.rt.navigateByUrl(`encuestas/admin/${id}`)
  }
}
