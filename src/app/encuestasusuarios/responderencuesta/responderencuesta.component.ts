import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { encuesta } from 'src/app/interfaces/encuestas.interface';
import { preguntas_usuarios } from 'src/app/interfaces/preguntas.interface';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';

@Component({
  selector: 'app-responderencuesta',
  templateUrl: './responderencuesta.component.html',
  styleUrls: ['./responderencuesta.component.css']
})
export class ResponderencuestaComponent implements OnInit {

  id:any;
  preguntas:preguntas_usuarios[] = []
  cargando:boolean = true;
  encuesta:encuesta;
  constructor(
    private ps:PreguntasService,
    private es:EncuestasService,
    private ar:ActivatedRoute
  ) {
    this.id = this.ar.snapshot.paramMap.get("id");
   }

  ngOnInit(): void {
    this.getEncuesta(this.id);
  }

  getEncuesta(id:number){
    this.es.getOneById(id).subscribe(
      res => {
        this.encuesta = res;
        this.getPreguntas(this.encuesta.id_encuesta)
      },
      err => {
        console.log(err)
      }
    );
  }

  getPreguntas(id:number){
    this.ps.getPreguntasUsuarios(id).subscribe(
      res => {
        console.log(res)
        this.preguntas = res;
        this.cargando = false;
      },
      err => console.log(err)
    );
  }

}
