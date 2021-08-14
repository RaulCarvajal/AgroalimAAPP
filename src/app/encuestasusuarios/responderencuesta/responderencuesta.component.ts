import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { encuesta } from 'src/app/interfaces/encuestas.interface';
import { preguntas_usuarios } from 'src/app/interfaces/preguntas.interface';
import { qa } from 'src/app/interfaces/qa.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { regex } from 'src/app/validators/regex.consts';
import { FinalizarencuestaSnackbarComponent } from "./../../snackbar/finalizarencuesta-snackbar/finalizarencuesta-snackbar.component";
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

  progreso:number = 0;
  mostrarProgreso:boolean = false;
  preguntasForm:FormGroup;

  contestada:boolean = false;

  constructor(
    private ps:PreguntasService,
    private es:EncuestasService,
    private ar:ActivatedRoute,
    private fb:FormBuilder,
    private as:AuthService,
    private sb:MatSnackBar,
    private rt:Router
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
        setTimeout(()=>{
          this.addPreguntas(this.preguntas.length)
          this.getRespuestas();
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
          fk_id_contacto : [this.as.getContactoId(),[Validators.required]],
          fk_id_empresa : [this.as.getEmpresaId(),[Validators.required]],
          fk_id_encuesta : [this.encuesta.id_encuesta,[Validators.required]]
        }
      ));
    }
  }
  
  get pForm(){
    return this.preguntasForm.get('qa') as FormArray;
  }

  async save(){
    if(!this.contestada){
      this.preguntasForm.disable()
      let qa:qa[]=this.preguntasForm.value.qa;
      let ppp = 100/qa.length;
      for await (const iterator of qa) {
        iterator.fk_id_opcion = +iterator.fk_id_opcion;
        iterator.fecha_respuesta = new Date().toISOString()
        let res = await this.es.saveQa(iterator)
        this.progreso = this.progreso+ppp;
      }
      if(this.progreso == 100){
        this.sb.openFromComponent(FinalizarencuestaSnackbarComponent, {
          duration: 5000,
        });
        this.contestada = true;
      }
    }else{
      this.rt.navigateByUrl(`encuestas/resultados/${this.encuesta.id_encuesta}`)
    }
    
  }

  getRespuestas(){
    this.es.tieneRespuestas(this.as.getEmpresaId(),this.encuesta.id_encuesta).subscribe(
      res=>{
        if(res.length/* == this.preguntas.length*/){
          this.preguntasForm.disable();
          this.contestada = true;
          //this.rt.navigateByUrl(`/encuestas/resultados/${this.encuesta.id_encuesta}`)
        }
      },
      err => {
        console.log(err)
      }
    )
  }

}
