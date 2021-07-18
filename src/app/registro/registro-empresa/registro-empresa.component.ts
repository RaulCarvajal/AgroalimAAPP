import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sector_atendido } from 'src/app/interfaces/sectoresatendidos.interface';
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { EmpresasService } from 'src/app/servicios/empresas.service';
import { regex } from "./../../validators/regex.consts";
import { RfcexistenteSnackbarComponent } from "./../../snackbar/rfcexistente-snackbar/rfcexistente-snackbar.component";
import { RegistroComponent } from '../registro.component';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {

  empresaForm:FormGroup;
  sectores_atendidos:sector_atendido[] = [];
  cargando:boolean = true;

  constructor(
    private fb:FormBuilder,
    private cs:CatalogosService,
    private es:EmpresasService,
    private sb:MatSnackBar,
    private rc:RegistroComponent
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getSectoresAtendidos();
  }
  
  initForm(){
    this.empresaForm = this.fb.group({
      nombre : ["",[Validators.required,Validators.maxLength(150),Validators.pattern(regex.white_space)]],
      razon_social : ["",[Validators.required,Validators.maxLength(150),Validators.pattern(regex.white_space)]],
      rfc : ["",[Validators.required,Validators.maxLength(13),Validators.pattern(regex.rfc)]],
      fecha_creacion : ["",[Validators.required]],
      descripcion_oferta_valor : ["",[Validators.required,Validators.maxLength(500)]],
      web : [null,[Validators.maxLength(200),Validators.pattern(regex.url)]],
      linkedin : [null,[Validators.maxLength(100),Validators.pattern(regex.url)]],
      facebook : [null,[Validators.maxLength(100),Validators.pattern(regex.url)]],
      twitter : [null,[Validators.maxLength(100),Validators.pattern(regex.url)]],
      instagram : [null,[Validators.maxLength(100),Validators.pattern(regex.url)]],
      sectores_atendidos : [null,[Validators.maxLength(250),Validators.pattern(regex.white_space)]],
      principales_clientes : [null,[Validators.maxLength(250),Validators.pattern(regex.white_space)]],
    })
  }

  saveEmpresa(){
    this.cargando = true;
    this.empresaForm.value.sectores_atendidos = this.empresaForm.value.sectores_atendidos.join(",")
    console.log(this.empresaForm.value);
    this.es.getByRfc(this.empresaForm.value.rfc).subscribe(
      res => {
        if(res.length){
          this.rfcExistenteSb()
          this.cargando = false;
        }else{
          this.es.save(this.empresaForm.value).subscribe(
            res => {
              window.localStorage.setItem("ridne", `${res.id_empresa}`);
              this.rc.guardarContacto();
              this.cargando = false;
            },
            err => {
              this.cargando = false
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    )
    
  }

  getSectoresAtendidos(){
    this.cs.getCatalogoSectoresAtendidos().subscribe(
      res => {
        this.sectores_atendidos = res;
        this.cargando = false;
      },
      err => console.log(err)
    );
  }

  rfcExistenteSb(){
    this.sb.openFromComponent(RfcexistenteSnackbarComponent, {
      duration: 5000,
    });
  }

}
