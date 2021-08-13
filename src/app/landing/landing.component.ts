import { encuesta_tabla_user } from '../interfaces/encuestas.interface';
import { EncuestasService } from '../servicios/encuestas.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  encuestas:encuesta_tabla_user [] = [];
  cargando_encuestas:boolean = true;

  constructor(
    private es:EncuestasService
  ) { }

  ngOnInit(): void {
    this.getEncuestasTable();
  }

  getEncuestasTable(){
    this.es.getAllEncuestaUsersTable().subscribe(
      res => {
        this.encuestas = res;
        this.cargando_encuestas = false;
      },
      err => console.log(err)
    );
  }


}
 