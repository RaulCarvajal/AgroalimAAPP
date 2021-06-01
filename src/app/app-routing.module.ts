import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { PuestosComponent } from "./catalogos/puestos/puestos.component";
import { SedesComponent } from "./catalogos/sedes/sedes.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { EmpresaComponent } from './empresas/empresa/empresa.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ContactoComponent } from './contactos/contacto/contacto.component';


const routes: Routes = [
  {path : "catalogos", component : CatalogosComponent},
  {path : "catalogos/puestos", component : PuestosComponent},
  {path : "catalogos/sedes", component : SedesComponent},
  {path : "empresas", component : EmpresasComponent},
  {path : "empresas/:id", component : EmpresaComponent},
  {path : "contactos", component : ContactosComponent},
  {path : "contactos/:id", component : ContactoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
