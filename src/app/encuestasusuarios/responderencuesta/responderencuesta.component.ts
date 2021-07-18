import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { encuesta } from 'src/app/interfaces/encuestas.interface';
import { preguntas_usuarios } from 'src/app/interfaces/preguntas.interface';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { regex } from 'src/app/validators/regex.consts';

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

  preguntasForm:FormGroup;

  constructor(
    private ps:PreguntasService,
    private es:EncuestasService,
    private ar:ActivatedRoute,
    private fb:FormBuilder
  ) {
    this.id = this.ar.snapshot.paramMap.get("id");
   }

  ngOnInit(): void {
    this.getEncuesta(this.id);
    this.initForm();
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
        this.preguntas = res;
        //this.cargando = false;
        setTimeout(()=>{
          this.addPreguntas(this.preguntas.length)
          this.cargando = false;
        },1500)
      },
      err => console.log(err)
    );
  }

  initForm(){
    this.preguntasForm = this.fb.group({
      qa : this.fb.array([])
    })
  }
  private addPreguntas(p:number){
    const cntrs = <FormArray>this.preguntasForm.controls['qa'];
    for (let index = 0; index < p; index++) {
      cntrs.push(this.fb.group(
        {
          fk_id_pregunta : [this.preguntas[index].id_pregunta,[Validators.required]],
          fk_id_opcion : ["",[Validators.required]],
          fk_id_contacto : [1,[Validators.required]],
          fk_id_empresa : [1,[Validators.required]],
        }
      ));
    }
  }
  
  get pForm(){
    return this.preguntasForm.get('qa') as FormArray;
  }

  save(){
    console.log(this.preguntasForm.value)
  }

}
