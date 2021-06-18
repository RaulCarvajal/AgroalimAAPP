import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { preguntaReq } from 'src/app/interfaces/preguntas.interface';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { FinalizarSnackbarComponent } from 'src/app/snackbar/finalizar-snackbar/finalizar-snackbar.component';
import { regex } from 'src/app/validators/regex.consts';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-preguntas',
  templateUrl: './add-preguntas.component.html',
  styleUrls: ['./add-preguntas.component.css']
})
export class AddPreguntasComponent implements OnInit {

  idEncuesta:any = 0;

  preguntaForm:FormGroup;
  preguntas:string[] = []

  cargando:boolean = false;
  error:boolean = false;

  constructor(
    private fb:FormBuilder,
    private ps:PreguntasService,
    private sb: MatSnackBar,
    private lc:Location,
    private ar:ActivatedRoute
  ) {
    //Get parametro
    this.idEncuesta = this.ar.snapshot.paramMap.get("eid");
   }

  ngOnInit(): void {
    this.initPreguntaForm();
  }

  

  initPreguntaForm(){
    this.preguntaForm = this.fb.group({
      pregunta : ["",[Validators.required,Validators.maxLength(300),Validators.pattern(regex.white_space)]],
      fecha_registro : ["",[]],
      estatus : [1,[]],
      fk_id_encuesta : [this.idEncuesta,[]],
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
    pregunta.fk_id_encuesta = this.idEncuesta;
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
