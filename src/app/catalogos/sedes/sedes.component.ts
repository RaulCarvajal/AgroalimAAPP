import { Component, OnInit } from '@angular/core';
import { sede } from 'src/app/interfaces/sedes.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { SedesService } from 'src/app/servicios/sedes.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  /**Puestos vars */
  sedes:sede[]=[];
  cargando_sedes:boolean=true;
  newSede:string="";
  /**Puestos vars */

  constructor(
    private ss:SedesService,
    private as:AuthService
  ) { 
    this.getFullSedes()
  }

  ngOnInit(): void {
    this.as.sysadminAuth();
  }

  
  getFullSedes(){
    this.ss.getFull().subscribe(
      res => {
        this.sedes = res;
        this.cargando_sedes = false;
      },
      err => console.log(err)
    );
  }

  update(id:number){
    let sede:sede = <sede>this.sedes.find(s => s.id_cat_sede == id);
    sede.estado = !sede.estado;
    this.ss.updateOne(sede).subscribe(
      res => {
        console.log(res)
        this.getFullSedes()
      },
      err => {
        console.log(err)
      }
    )
  }

  search(){
    if(this.newSede){
      let regex = new RegExp(this.newSede);
      this.sedes = this.sedes.filter( p => p.tipo_sede.match(regex))
    }else{
      this.getFullSedes()
    }
  }

  save(){
    let temp:any = { 
      tipo_sede : this.newSede,
      estado : false
    }
    this.ss.saveOne(temp).subscribe(
      res => {
        console.log(res)
        this.getFullSedes();
      },err => {
        console.error(err);
      }
    )
  }

}
