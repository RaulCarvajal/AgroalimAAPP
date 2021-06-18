import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { opcion, pregunta, preguntaReq } from 'src/app/interfaces/preguntas.interface';
import { OpcionesService } from 'src/app/servicios/opciones.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { regex } from 'src/app/validators/regex.consts';

@Component({
  selector: 'app-editar-pregunta',
  templateUrl: './editar-pregunta.component.html',
  styleUrls: ['./editar-pregunta.component.css']
})
export class EditarPreguntaComponent implements OnInit {

  id:any;
  preguntaForm:FormGroup;
  preguntas:string[] = []
  cargando_pregunta:boolean = true;

  pregunta:pregunta;
  opciones:opcion[];
  
  constructor(
    private fb:FormBuilder,
    private ps:PreguntasService,
    private ar:ActivatedRoute,
    private os:OpcionesService
  ) 
  {
    this.id = this.ar.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    //this.id = this.data.id
    this.getPregunta(this.id)
  }

  getPregunta(id:any){
    this.ps.getOne(id).subscribe(
      res => {
        this.pregunta = res; 
        this.getOpciones(res.id_pregunta)
      },
      err => console.log(err)
    )
  }
  getOpciones(fkidp:number){
    this.os.getOpcionesPorPregunta(fkidp).subscribe(
      res =>  {
        this.opciones = res;
        this.initPreguntaForm()
      },
      err =>  console.log(err)
    )
  }

  initPreguntaForm(){
    this.preguntaForm = this.fb.group({
      id_pregunta : [this.pregunta.id_pregunta,[]],
      pregunta : [this.pregunta.pregunta,[Validators.required,Validators.maxLength(300),Validators.pattern(regex.white_space)]],
      fecha_registro : [this.pregunta.fecha_registro,[]],
      estatus : [this.pregunta.estatus,[]],
      fk_id_encuesta : [this.pregunta.fk_id_encuesta,[]],
      opciones : this.fb.array([])
    });
    for (let index = 0; index < this.opciones.length; index++) {
      this.addOpcion()
    }
    this.preguntaForm.patchValue({opciones : this.opciones})
    this.cargando_pregunta = false; 
  }
  
  savePreguntas(){
    this.cargando_pregunta = true;
    //Primero guardar pregunta
    let formdata: preguntaReq = <preguntaReq>this.preguntaForm.value;
    let preguntaUpd: pregunta = {
      id_pregunta : formdata.id_pregunta,
      pregunta : formdata.pregunta,
      fk_id_encuesta : formdata.fk_id_encuesta,
      estatus : formdata.estatus,
      fecha_registro : formdata.fecha_registro
    }
    this.ps.updatePregunta(preguntaUpd).subscribe(
      res => {
        console.log(res)
        this.getPregunta(this.id)
      },
      err => {
        console.error(err)
      }
    );
    //Actualizar/Guardar Opciones
    let opcionesUpd:opcion[] = formdata.opciones;
    this.saveUpdateOpciones(opcionesUpd)
  }

  saveUpdateOpciones(opciones:opcion[]){
    opciones.forEach(opc => {
      if(opc.id_opcion==-1){
        this.os.saveOpcion(opc).subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      }else{
        this.os.update(opc).subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      }
    });
    this.cargando_pregunta = false;
  }

  addOpcion(){
    const cntrs = <FormArray>this.preguntaForm.controls['opciones'];
    cntrs.push(this.fb.group(
      {
        id_opcion : [-1,[]],
        texto : ["",[Validators.required,Validators.maxLength(300),Validators.pattern(regex.white_space)]], 
        estatus : [true,[]], 
        fk_id_pregunta : [+this.id,[]] 
      }
    ));
  }
  delOpcion(pind:number){
    const cntrs = <FormArray>this.preguntaForm.controls['opciones'];
    cntrs.removeAt(pind); 
  }
  get opcionesA(){
    return this.preguntaForm.get('opciones') as FormArray;
  }
  updatePreguntaStatus(){
    /*this.pregunta.estatus = !this.pregunta.estatus
    this.ps.updateStatus(this.pregunta).subscribe(
      res =>{
        console.log(res)
        this.getPregunta(this.id)
      },
      err => console.log(err)
    )*/
  }
  updateOpcionStatus(i:number){
    this.opciones[i].estatus = !this.opciones[i].estatus;
    this.os.update(this.opciones[i]).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
