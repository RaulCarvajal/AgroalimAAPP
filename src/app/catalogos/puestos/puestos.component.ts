import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { puesto } from '../../interfaces/puestos.interface';
import { PuestosService } from '../../servicios/puestos.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {

  /**Puestos vars */
  puestos:puesto[]=[];
  cargando_puestos:boolean=true;
  newPuesto:string="";
  /**Puestos vars */

  constructor(
    private ps:PuestosService,
    private as:AuthService
  ) { 
    this.getFullPuestos()
  }

  ngOnInit(): void {
    this.as.sysadminAuth();
  }

  getFullPuestos(){
    this.ps.getFull().subscribe(
      res => {
        this.puestos = res;
        this.cargando_puestos = false;
      },
      err => console.log(err)
    );
  }

  update(id:number){
    let puesto:puesto = <puesto>this.puestos.find(a => a.id_puesto == id);
    puesto.estado = !puesto.estado;
    this.ps.updateOne(puesto).subscribe(
      res => {
        console.log(res)
        this.getFullPuestos()
      },
      err => {
        console.log(err)
      }
    )
  }

  search(){
    if(this.newPuesto){
      let regex = new RegExp(this.newPuesto);
      this.puestos = this.puestos.filter( p => p.nombre_puesto.match(regex))
    }else{
      this.getFullPuestos()
    }
  }

  save(){
    let temp:any = { 
      nombre_puesto : this.newPuesto,
      estado : false
    }
    this.ps.saveOne(temp).subscribe(
      res => {
        console.log(res)
        this.getFullPuestos();
      },err => {
        console.error(err);
      }
    )
  }

}
