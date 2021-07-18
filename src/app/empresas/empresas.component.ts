import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empresa } from '../interfaces/empresas.interface';
import { AuthService } from '../servicios/auth.service';
import { EmpresasService } from '../servicios/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas:empresa[]=[];
  searchString:string="";

  cargando_tabla:boolean = true;
  constructor(
    private es:EmpresasService,
    private rt:Router,
    private as:AuthService
  ) { }

  ngOnInit(): void {
    this.as.sysadminAuth();
    this.getFullEmpresas();
  }

  getFullEmpresas(){
    this.es.getFull().subscribe(
      res => {
        this.empresas = res
        this.cargando_tabla = false;
      },
      err => {
        console.error(err)
      }
    );
  }

  search(){
    if(this.searchString){
      let regex = new RegExp(this.searchString);
      this.empresas = this.empresas.filter( p => p.nombre.match(regex))
    }else{
      this.getFullEmpresas()
    }
  }

  gotoDetail(id:number){
    console.log(id)
    this.rt.navigateByUrl(`empresas/${id}`)
  }

}
