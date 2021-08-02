import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogonComponent } from './logon/logon.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { PuestosComponent } from "./catalogos/puestos/puestos.component";
import { SedesComponent } from "./catalogos/sedes/sedes.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { EmpresaComponent } from './empresas/empresa/empresa.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ContactoComponent } from './contactos/contacto/contacto.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { NuevaencuestaComponent } from './encuestas/nuevaencuesta/nuevaencuesta.component';
import { EncuestaComponent } from './encuestas/encuesta/encuesta.component';
import { EditarPreguntaComponent } from './encuestas/editar-pregunta/editar-pregunta.component';
import { AddPreguntasComponent } from './encuestas/add-preguntas/add-preguntas.component';
import { ResultadosComponent } from './encuestas/resultados/resultados.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { ConstruccionComponent } from './construccion/construccion.component';
import { EncuestasusuariosComponent } from "./encuestasusuarios/encuestasusuarios.component";
import { ResponderencuestaComponent } from "./encuestasusuarios/responderencuesta/responderencuesta.component";
import { MiempresausuariosComponent } from './miempresausuarios/miempresausuarios.component';
import { NoautorizadoComponent } from './noautorizado/noautorizado.component';
import { RegistroComponent } from './registro/registro.component';
import { ResultadosencuestaComponent } from "./encuestasusuarios/resultadosencuesta/resultadosencuesta.component";

const routes: Routes = [
  {path : "logon", component : LogonComponent},
  {path : "registro", component : RegistroComponent},
  {path : "catalogos", component : CatalogosComponent},
  {path : "catalogos/puestos", component : PuestosComponent},
  {path : "catalogos/sedes", component : SedesComponent},
  {path : "miempresa", component : MiempresausuariosComponent},
  {path : "empresas", component : EmpresasComponent},
  {path : "empresas/:id", component : EmpresaComponent},
  {path : "contactos", component : ContactosComponent},
  {path : "contactos/:id", component : ContactoComponent},
  {path : "encuestas", component : EncuestasusuariosComponent},
  {path : "encuestas/respoder/:id", component : ResponderencuestaComponent},
  {path : "encuestas/resultados/:id", component : ResultadosencuestaComponent},
  {path : "encuestas/admin", component : EncuestasComponent},
  {path : "encuestas/admin/nueva", component : NuevaencuestaComponent},
  {path : "encuestas/admin/:id", component : EncuestaComponent},
  {path : "encuestas/admin/pregunta/:id", component : EditarPreguntaComponent},
  {path : "encuestas/admin/pregunta/add/:eid", component : AddPreguntasComponent},
  {path : "encuestas/admin/resultados/:eid", component : ResultadosComponent},
  {path : "micuenta", component : MicuentaComponent},
  {path : "construccion", component : ConstruccionComponent},
  {path : "403_Forbidden", component : NoautorizadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
