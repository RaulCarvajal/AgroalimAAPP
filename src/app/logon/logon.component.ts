import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { regex } from "../validators/regex.consts";
@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  loginForm:FormGroup;
  trying:boolean = false;
  fail:boolean = false;

  constructor(
    private fb:FormBuilder,
    private as:AuthService,
    private rt: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.itsLogged();
  }

  itsLogged(){
    if(this.as.isLoged()){
      this.rt.navigateByUrl("/")
    }
  }

  initForm():void{
    this.loginForm = this.fb.group({
      usuario : ['',[Validators.required,Validators.pattern(regex.white_space)]],
      password : ['',[Validators.required,Validators.pattern(regex.white_space)]]
    })
  }

  onSendForm(){
    let usr:string = this.loginForm.value.usuario;
    if(usr.startsWith('.\\')){
      this.tryLogonSysAdmin();
    }else{
      this.tryLogonUser();
    }
  }

  tryLogonUser():boolean{
    if(this.loginForm.valid){
      this.trying = true;
      this.as.logon(this.loginForm.value).subscribe(
        res => {
          if(res){
            this.trying = false;
            this.as.saveSession(res);
            window.location.reload();
          }else{
            this.trying = false;
            this.fail = true;
          }
        },
        err => {
          this.trying = false;
          this.fail = true;
        }
      );
      return true
    }else{
      return false
    }
    
  }
  
  tryLogonSysAdmin():boolean{
    this.trying = true;
    this.as.logonsysadmin(this.loginForm.value).subscribe(
      res => {
        if(res){
          res.tipo_usuario = "sysadmin";
          this.trying = false;
          this.as.saveSession(res);
          window.location.reload();
        }else{
          this.trying = false;
          this.fail = true;
        }
      },
      err => {
        this.trying = false;
        this.fail = true;
      }
    );
    return true
  }
  

}
