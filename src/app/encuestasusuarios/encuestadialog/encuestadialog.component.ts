import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { encuesta_tabla_user } from 'src/app/interfaces/encuestas.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { EncuestasService } from 'src/app/servicios/encuestas.service';

@Component({
  selector: 'app-encuestadialog',
  templateUrl: './encuestadialog.component.html',
  styleUrls: ['./encuestadialog.component.css']
})
export class EncuestadialogComponent {

  contestada:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EncuestadialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: encuesta_tabla_user,
    private rt:Router,
    private as:AuthService,
    private es:EncuestasService
  ) {
    this.getRespuestas(data.id_encuesta);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  gotoResponder(id:number){
    this.onNoClick();
    this.rt.navigateByUrl(`encuestas/respoder/${id}`)
  }
  gotoResultados(id:number){
    this.onNoClick();
    this.rt.navigateByUrl(`encuestas/resultados/${id}`)
  }


  getRespuestas(id_encuesta:number){
    this.es.tieneRespuestas(this.as.getEmpresaId(),id_encuesta).subscribe(
      res=>{
        if(res.length/* == this.preguntas.length*/){
          this.contestada = true;
        }
      },
      err => {
        console.log(err)
      }
    )
  }

}
