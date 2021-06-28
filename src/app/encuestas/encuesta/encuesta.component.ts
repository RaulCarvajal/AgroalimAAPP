import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { encuesta } from 'src/app/interfaces/encuestas.interface';
import { pregunta, pregunta_tabla_admin } from 'src/app/interfaces/preguntas.interface';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { EditarPreguntaComponent } from '../editar-pregunta/editar-pregunta.component';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  cargando_encuesta:boolean = true;
  cargando_preguntas:boolean = true;
  encuesta:encuesta;
  preguntas:pregunta_tabla_admin[] = [];
  id:any = null;

  constructor(
    private es:EncuestasService,
    private ar:ActivatedRoute,
    private ps:PreguntasService,
    private rt:Router
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
        this.cargando_encuesta = false;
        this.getPreguntasDash(this.encuesta.id_encuesta)
      },
      err => console.error(err)
    );
  }

  getPreguntasDash(id:number){
    this.ps.getPreguntasDashAdmin(id).subscribe(
      res => {
        this.preguntas = res;
        this.cargando_preguntas = false
      },
      err => console.error(err)
    );
  }

  detallePregunta(id:number){
    this.rt.navigateByUrl(`encuestas/pregunta/${id}`);
  }

  update(){
    this.encuesta.estatus = !this.encuesta.estatus;
    this.es.update(this.encuesta).subscribe(
      res => this.getEncuesta(this.id),
      err => console.error(err)
    )
  }

  addPreguntas(){
    this.rt.navigateByUrl(`encuestas/pregunta/add/${this.id}`)
  }
  verResultados(){
    this.rt.navigateByUrl(`encuestas/resultados/${this.id}`)
  }

}
