import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { puesto } from 'src/app/interfaces/puestos.interface';
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { ContactosService } from 'src/app/servicios/contactos.service';
import { regex } from "./../../validators/regex.consts";
import { ContactoexistenteSnackbarComponent } from "./../../snackbar/contactoexistente-snackbar/contactoexistente-snackbar.component";
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro-contacto',
  templateUrl: './registro-contacto.component.html',
  styleUrls: ['./registro-contacto.component.css']
})
export class RegistroContactoComponent implements OnInit {

  ide:number = 0;
  formContacto:FormGroup;
  cargando:boolean = true;
  puestos:puesto[] = [];

  constructor(
    private fb:FormBuilder,
    private cs:CatalogosService,
    private cns:ContactosService,
    private sb:MatSnackBar,
    private as:AuthService
  ) { }

  ngOnInit(): void {
    this.ide = +window.localStorage.getItem("ridne")!;
    this.initForm();
    this.getPuestos();
  }

  initForm(){
    this.formContacto = this.fb.group({
      nombres : [null,[Validators.required, Validators.maxLength(50),Validators.pattern(regex.white_space)]],
      apellidos : [null,[Validators.required, Validators.maxLength(50),Validators.pattern(regex.white_space)]],
      fecha_nacimiento : [null,[Validators.required]],
      email : [null,[Validators.required,Validators.maxLength(30),Validators.email]],
      telefono : [null,[Validators.required,Validators.maxLength(30),Validators.pattern(regex.phone)]],
      fk_id_puesto : [null,[Validators.required]],
      nombre_usuario : [null,[Validators.required,Validators.maxLength(30),Validators.pattern(regex.white_space)]],
      contrasena : [null,[Validators.required,Validators.maxLength(12),Validators.minLength(6),Validators.pattern(regex.white_space)]],
      tipo_usuario : ["admin"],
      estatus_registro : [6],
      fk_id_empresa : [this.ide],
      estado : [true]
    })
  }

  saveContacto(){
    console.log(this.formContacto.value)
    this.cargando = true;
    this.cns.getContactoByUsername(this.formContacto.value.nombre_usuario).subscribe(
      res => {
        if(res.length){
          this.usernameExistenteSb()
          this.cargando = false;
        }else{
          this.cns.save(this.formContacto.value).subscribe(
            res => {
              this.cargando = false;
              this.as.saveSession(res);
              window.localStorage.removeItem("ridne");
              window.location.reload();
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }

  getPuestos(){
    this.cs.getCatalogoPuestos().subscribe(
      res => {
        this.puestos = res;
        this.cargando = false;
      },
      err => {
        console.error(err);
    });
  }

  usernameExistenteSb(){
    this.sb.openFromComponent(ContactoexistenteSnackbarComponent, {
      duration: 5000,
    });
  }
}
