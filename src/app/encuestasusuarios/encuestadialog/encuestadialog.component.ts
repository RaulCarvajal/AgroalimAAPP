import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { encuesta_tabla_user } from 'src/app/interfaces/encuestas.interface';

@Component({
  selector: 'app-encuestadialog',
  templateUrl: './encuestadialog.component.html',
  styleUrls: ['./encuestadialog.component.css']
})
export class EncuestadialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EncuestadialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: encuesta_tabla_user,
    private rt:Router
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  gotoResponder(id:number){
    this.onNoClick();
    this.rt.navigateByUrl(`encuestas/respoder/${id}`)
  }

}
