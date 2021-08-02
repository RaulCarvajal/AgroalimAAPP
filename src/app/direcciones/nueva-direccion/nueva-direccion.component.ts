import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { estado } from 'src/app/interfaces/estadosmunicipios.interface';
import { municipio, sede } from 'src/app/interfaces/sedes.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { DireccionesService } from 'src/app/servicios/direcciones.service';

@Component({
  selector: 'app-nueva-direccion',
  templateUrl: './nueva-direccion.component.html',
  styleUrls: ['./nueva-direccion.component.css']
})
export class NuevaDireccionComponent implements OnInit {

  dirForm:FormGroup;
  sedes:sede[] = []
  estados:estado[] = [];
  municipios:municipio[] = [];

  constructor(
    private fb:FormBuilder,
    private cs:CatalogosService,
    private as:AuthService,
    private ds:DireccionesService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getSedes()
    this.getEstados();
  }

  initForm(){
    this.dirForm = this.fb.group({
      direccion : ['',[Validators.required, Validators.maxLength(150)]],
      tipo_sede : ['',[Validators.required]],
      estado : ['',[Validators.required]],
      municipio : ['',[Validators.required]],
      id_empresa : [this.as.getEmpresaId(),[Validators.required]]
    });
  }

  getSedes(){
    this.cs.getTiposSedes().subscribe(
      res => {
        this.sedes = res;
      },
      err => console.log(err)
    );
  }

  getEstados(){
    this.cs.getEstadosMex().subscribe(
      res => {
        this.estados = res;
      },
      err => console.log(err)
    )
  }

  getMunicipios(){
    this.cs.getMunicipiosEstados(this.estados.find(e => e.nombre_estado == this.dirForm.value!.estado)!.id_estado).subscribe(
      res => {
        this.municipios = res;
      },
      err => console.log(err)
    )
  }

  saveAddress(){
    this.ds.save(this.dirForm.value).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
