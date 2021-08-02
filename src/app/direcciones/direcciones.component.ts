import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '../servicios/auth.service';
import { DireccionesService } from '../servicios/direcciones.service';
import { NuevaDireccionComponent } from "./nueva-direccion/nueva-direccion.component";

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  cargando:boolean = true;
  direcciones:any [] = []

  constructor(
    private ds:DireccionesService,
    private as:AuthService,
    public md: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDirecciones()
  }

  getDirecciones(){
    this.ds.getDireccionesByEmpresa(this.as.getEmpresaId()).subscribe(
      res => {
        this.direcciones = res;
        this.cargando = false;
      },
      err => console.log(err)
    );
  }

  openNewDireccion() {
    let dialogconfig = new MatDialogConfig();
    dialogconfig.maxWidth = "50%"
    const dialogRef = this.md.open(NuevaDireccionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      setTimeout(() => {
        this.getDirecciones();
      }, 1000);
    });
  }

}
