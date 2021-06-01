import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

/*ANGULAR MATERIAL IMPORTS*/
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
/*ANGULAR MATERIAL IMPORTS*/

import { CatalogosComponent } from './catalogos/catalogos.component';
import { PuestosService } from "./servicios/puestos.service";
import { PuestosComponent } from './catalogos/puestos/puestos.component';
import { SedesComponent } from './catalogos/sedes/sedes.component';
import { SedesService } from "./servicios/sedes.service";
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresasService } from "./servicios/empresas.service";
import { EmpresaComponent } from './empresas/empresa/empresa.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ContactosService } from "./servicios/contactos.service";
import { ContactoComponent } from './contactos/contacto/contacto.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CatalogosComponent,
    PuestosComponent,
    SedesComponent,
    EmpresasComponent,
    EmpresaComponent,
    ContactosComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatInputModule,
    MatExpansionModule
  ],
  providers: [
    PuestosService,
    SedesService,
    EmpresasService,
    ContactosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
