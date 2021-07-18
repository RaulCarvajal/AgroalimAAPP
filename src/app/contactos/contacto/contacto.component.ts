import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { contacto } from 'src/app/interfaces/contactos.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { ContactosService } from 'src/app/servicios/contactos.service';
import { EmpresasService } from 'src/app/servicios/empresas.service';
import { PuestosService } from 'src/app/servicios/puestos.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  id:any;
  contacto:contacto;
  cargando_contacto:boolean = true
  puesto:string=". . .";
  empresa:string=". . .";

  constructor(
    private cs:ContactosService,
    private ps:PuestosService,
    private es:EmpresasService,
    private ar:ActivatedRoute,
    private rt:Router,
    private as:AuthService
  ) {
    this.id = this.ar.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.as.sysadminAuth();
    this.getcontactoById(this.id)
  }

  getcontactoById(id:string){
    this.cs.getFullOne(+id).subscribe(
      res => {
        this.contacto = res;
        this.getEmpresa(this.contacto.fk_id_empresa+"");
        this.getPuesto(this.contacto.fk_id_puesto);
        this.cargando_contacto = false;
      },
      err => {
        console.log(err)
      }
    );
  }

  getEmpresa(id:string){
    this.es.getFullOne(id).subscribe(
      res => this.empresa = res.nombre
    );
  }

  getPuesto(id:number){
    this.ps.getFullOne(id).subscribe(res => this.puesto = res.nombre_puesto)
  }

  update(){
    this.contacto.estado = !this.contacto.estado;
    this.cs.updateOne(this.contacto).subscribe(
      res => {
        console.log(res)
        //this.getcontactoById(this.id)
      },
      err => {
        console.log(err)
      }
    )
  }

  gotoDetail(){
    this.rt.navigateByUrl(`empresas/${this.contacto.fk_id_empresa}`)
  }
  
}
