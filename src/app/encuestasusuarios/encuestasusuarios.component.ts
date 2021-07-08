import { Component, OnInit } from '@angular/core';
import { encuesta_tabla_user } from '../interfaces/encuestas.interface';
import { EncuestasService } from '../servicios/encuestas.service';
import { MatDialog } from '@angular/material/dialog';
import { EncuestadialogComponent } from "./encuestadialog/encuestadialog.component";
@Component({
  selector: 'app-encuestasusuarios',
  templateUrl: './encuestasusuarios.component.html',
  styleUrls: ['./encuestasusuarios.component.css']
})
export class EncuestasusuariosComponent implements OnInit {

  constructor(
    private es:EncuestasService,
    public dialog: MatDialog
  ) { }

  encuestas:encuesta_tabla_user [] = [];
  cargando_encuestas:boolean = true;
  searchString:string = "";

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

  search(){
    if(this.searchString){
      let regex = new RegExp(this.searchString);
      this.encuestas = this.encuestas.filter( c => c.nombre.match(regex))
    }else{
      this.getEncuestasTable()
    }
  }

  openEncuesta(id: number){
    const dialogRef = this.dialog.open(EncuestadialogComponent, {
      width: '300px',
      data: this.encuestas[id]
    });

    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
    */
  }

}
