import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { registerLocaleData } from '@angular/common';

import localeEsMX from '@angular/common/locales/es-MX';
registerLocaleData(localeEsMX, 'es-MX');

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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
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
import { EncuestasComponent } from './encuestas/encuestas.component';
import { NuevaencuestaComponent } from './encuestas/nuevaencuesta/nuevaencuesta.component';
import { EncuestasService } from "./servicios/encuestas.service";
import { PreguntasService } from "./servicios/preguntas.service";
import { FinalizarSnackbarComponent } from './snackbar/finalizar-snackbar/finalizar-snackbar.component';
import { EncuestaComponent } from './encuestas/encuesta/encuesta.component';
import { EditarPreguntaComponent } from './encuestas/editar-pregunta/editar-pregunta.component';
import { OpcionesService } from "./servicios/opciones.service";
import { AddPreguntasComponent } from './encuestas/add-preguntas/add-preguntas.component';
import { ResultadosComponent } from './encuestas/resultados/resultados.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { ConstruccionComponent } from './construccion/construccion.component';
import { EncuestasusuariosComponent } from './encuestasusuarios/encuestasusuarios.component';
import { ResponderencuestaComponent } from './encuestasusuarios/responderencuesta/responderencuesta.component';
import { ResultadosencuestaComponent } from './encuestasusuarios/resultadosencuesta/resultadosencuesta.component';
import { EncuestadialogComponent } from './encuestasusuarios/encuestadialog/encuestadialog.component';
import { MiempresausuariosComponent } from './miempresausuarios/miempresausuarios.component';
import { LogonComponent } from './logon/logon.component';
import { AuthService } from "./servicios/auth.service";
import { NoautorizadoComponent } from './noautorizado/noautorizado.component';
import { RegistroEmpresaComponent } from './registro/registro-empresa/registro-empresa.component';
import { RegistroContactoComponent } from './registro/registro-contacto/registro-contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { RfcexistenteSnackbarComponent } from './snackbar/rfcexistente-snackbar/rfcexistente-snackbar.component';
import { ContactoexistenteSnackbarComponent } from './snackbar/contactoexistente-snackbar/contactoexistente-snackbar.component';
import { FinalizarencuestaSnackbarComponent } from './snackbar/finalizarencuesta-snackbar/finalizarencuesta-snackbar.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { DireccionComponent } from './direcciones/direccion/direccion.component';
import { NuevaDireccionComponent } from './direcciones/nueva-direccion/nueva-direccion.component';

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
    ContactoComponent,
    EncuestasComponent,
    NuevaencuestaComponent,
    FinalizarSnackbarComponent,
    EncuestaComponent,
    EditarPreguntaComponent,
    AddPreguntasComponent,
    ResultadosComponent,
    MicuentaComponent,
    ConstruccionComponent,
    EncuestasusuariosComponent,
    ResponderencuestaComponent,
    ResultadosencuestaComponent,
    EncuestadialogComponent,
    MiempresausuariosComponent,
    LogonComponent,
    NoautorizadoComponent,
    RegistroEmpresaComponent,
    RegistroContactoComponent,
    RegistroComponent,
    RfcexistenteSnackbarComponent,
    ContactoexistenteSnackbarComponent,
    FinalizarencuestaSnackbarComponent,
    DireccionesComponent,
    DireccionComponent,
    NuevaDireccionComponent
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    ChartsModule,
    MatButtonToggleModule,
    MatAutocompleteModule
  ],
  providers: [
    PuestosService,
    SedesService,
    EmpresasService,
    ContactosService,
    MatDatepickerModule,
    EncuestasService,
    PreguntasService,
    OpcionesService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'es-MX' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
