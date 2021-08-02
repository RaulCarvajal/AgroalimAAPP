import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empresa } from '../interfaces/empresas.interface';
import { organizacionesempresa, org_emp } from '../interfaces/organizacionesempresa.interface';
import { AuthService } from '../servicios/auth.service';
import { EmpresasService } from '../servicios/empresas.service';
import { OrganizacionesempresaService } from '../servicios/organizacionesempresa.service';

@Component({
  selector: 'app-miempresausuarios',
  templateUrl: './miempresausuarios.component.html',
  styleUrls: ['./miempresausuarios.component.css']
})
export class MiempresausuariosComponent implements OnInit {

  id:any = 4;
  empresa:empresa;
  cargando_empresa:boolean = true
  org_emp:string [] = [];

  constructor(
    private es:EmpresasService,
    private ar:ActivatedRoute,
    private as:AuthService,
    private oes:OrganizacionesempresaService
  ) { 
    this.id = this.as.getEmpresaId();
  }

  ngOnInit(): void {
    this.getEmpresaById(this.id)
    this.getOrgsEmpresa();
  }

  getEmpresaById(id:string){
    this.es.getFullOne(id).subscribe(
      res => {
        this.empresa = res;
        this.cargando_empresa = false;
      },
      err => {
        console.log(err)
      }
    );
  }

  getOrgsEmpresa(){
    this.oes.getOrganizacionesDeEmpresa(this.as.getEmpresaId()).subscribe(
      res => {
          this.org_emp = res.map((item) => {
            return item.organizacion;
          });
      },
      err => console.log(err)
    )
  }
}
