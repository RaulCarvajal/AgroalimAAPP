import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empresa } from 'src/app/interfaces/empresas.interface';
import { EmpresasService } from 'src/app/servicios/empresas.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  id:any;
  empresa:empresa;
  cargando_empresa:boolean = true

  constructor(
    private es:EmpresasService,
    private ar:ActivatedRoute
  ) {
    this.id = this.ar.snapshot.paramMap.get("id");
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
