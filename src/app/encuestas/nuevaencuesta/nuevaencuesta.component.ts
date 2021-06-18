import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { preguntaReq } from 'src/app/interfaces/preguntas.interface';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { regex } from "../../validators/regex.consts";
import { FinalizarSnackbarComponent } from "../../snackbar/finalizar-snackbar/finalizar-snackbar.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nuevaencuesta',
  templateUrl: './nuevaencuesta.component.html',
  styleUrls: ['./nuevaencuesta.component.css']
})
export class NuevaencuestaComponent implements OnInit {

  encuestaForm:FormGroup;
  idEncuestaGuardada:number = 0;
  nombreEncuestaGuardada:string = "";

  preguntaForm:FormGroup;
  preguntas:string[] = []

  cargando:boolean = false;
  error:boolean = false;

  constructor(
    private fb:FormBuilder,
    private es:EncuestasService,
    private ps:PreguntasService,
    private sb: MatSnackBar,
    private lc:Location
  ) { }

  ngOnInit(): void {
    this.initEncuestaForm();
    this.initPreguntaForm();
  }

  initEncuestaForm(){
    this.encuestaForm = this.fb.group({
      nombre : [null, [Validators.required,Validators.maxLength(250),Validators.pattern(regex.white_space)]],
      descripcion : [null, [Validators.required,Validators.maxLength(500),Validators.pattern(regex.white_space)]],
      fecha_vigencia : [null, [Validators.required]],
      eversion : [0.01, [Validators.required]],
      fecha_registro : [null,[]],
      estatus : [0],
      fk_id_administrador : [1]
    });
  }

  saveEncuesta(){
    this.cargando = true;
    this.es.saveOne(this.encuestaForm.value).subscribe(
      res => {
        this.idEncuestaGuardada = res.id_encuesta;
        this.nombreEncuestaGuardada = res.nombre;
        this.cargando = false;
      },
      err => {
        this.error = true
        console.error(err)
      }
    );
  }

  initPreguntaForm(){
    this.preguntaForm = this.fb.group({
      pregunta : ["",[Validators.required,Validators.maxLength(300),Validators.pattern(regex.white_space)]],
      fecha_registro : ["",[]],
      estatus : [1,[]],
      fk_id_encuesta : [this.idEncuestaGuardada,[]],
      opciones : this.fb.array([
        this.fb.group({
          texto : ["",[Validators.required,Validators.maxLength(300),Validators.pattern(regex.white_space)]], 
          estatus : [true,[]], 
          fk_id_pregunta : [null,[]] 
        })
      ])
    });
  }

  savePreguntas(){
    let pregunta: preguntaReq;
    pregunta = <preguntaReq>this.preguntaForm.value;
    pregunta.fk_id_encuesta = this.idEncuestaGuardada;
    this.cargando = true;
    this.ps.saveOne(pregunta).subscribe(
      res => {
        this.preguntas.push(pregunta.pregunta);
        this.cargando = false;
        this.initPreguntaForm();
      },
      err => {
        this.error = true
        console.error(err)
      }
    );
  }

  addOpcion(){
    const cntrs = <FormArray>this.preguntaForm.controls['opciones'];
    cntrs.push(this.fb.group(
      {
        texto : ["",[Validators.required,Validators.maxLength(300),Validators.pattern(regex.white_space)]], 
        estatus : [true,[]], 
        fk_id_pregunta : [null,[]] 
      }
    ));
  }

  delOpcion(pind:number){
    const cntrs = <FormArray>this.preguntaForm.controls['opciones'];
    cntrs.removeAt(pind); 
  }

  get opciones(){
    return this.preguntaForm.get('opciones') as FormArray;
  }

  finalizar(){
    this.sb.openFromComponent(FinalizarSnackbarComponent, {
      duration: 5000,
    });
    setTimeout(() => {
      this.lc.back();
    }, 3000);
  }


}
