import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empresa } from '../interfaces/empresas.interface';
import { EmpresasService } from '../servicios/empresas.service';

@Component({
  selector: 'app-miempresausuarios',
  templateUrl: './miempresausuarios.component.html',
  styleUrls: ['./miempresausuarios.component.css']
})
export class MiempresausuariosComponent implements OnInit {

  id:any = 4;
  empresa:empresa;
  cargando_empresa:boolean = true

  constructor(
    private es:EmpresasService,
    private ar:ActivatedRoute
  ) { 
    //this.id = this.ar.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getEmpresaById(this.id)
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
}
