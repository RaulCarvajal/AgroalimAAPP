import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path : "catalogos", component : CatalogosComponent},
  {path : "catalogos/puestos", component : PuestosComponent},
  {path : "catalogos/sedes", component : SedesComponent},
  {path : "empresas", component : EmpresasComponent},
  {path : "empresas/:id", component : EmpresaComponent},
  {path : "contactos", component : ContactosComponent},
  {path : "contactos/:id", component : ContactoComponent},
  {path : "encuestas", component : EncuestasComponent},
  {path : "encuestas/nueva", component : NuevaencuestaComponent},
  {path : "encuestas/:id", component : EncuestaComponent},
  {path : "encuestas/pregunta/:id", component : EditarPreguntaComponent},
  {path : "encuestas/pregunta/add/:eid", component : AddPreguntasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
