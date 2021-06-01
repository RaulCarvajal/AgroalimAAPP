import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { contacto } from '../interfaces/contactos.interface';
import { ContactosService } from '../servicios/contactos.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  contactos:contacto[]=[];
  cargando_tabla:boolean = true;
  searchString:string="";

  constructor(
    private cs:ContactosService,
    private rt:Router
  ) { }

  ngOnInit(): void {
    this.getFullContactos()
  } 

  getFullContactos(){
    this.cs.getFull().subscribe(
      res => {
        this.contactos = res;
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
      this.contactos = this.contactos.filter( c => c.nombres.match(regex) || c.apellidos.match(regex) || c.nombre_usuario.match(regex))
    }else{
      this.getFullContactos()
    }
  }

  gotoDetail(id:number){
    this.rt.navigateByUrl(`contactos/${id}`)
  }

  update(id:number){
    let contacto:contacto = <contacto>this.contactos.find(a => a.id_contacto == id);
    contacto.estado = !contacto.estado;
    this.cs.updateOne(contacto).subscribe(
      res => {
        console.log(res)
        this.getFullContactos()
      },
      err => {
        console.log(err)
      }
    )
  }

}
