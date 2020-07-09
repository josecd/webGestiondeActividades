import { MaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar/calendar.component';
import { LoginComponent } from './components/login/login/login.component';
import { ErrorComponent } from './components/error/error/error.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarUtilComponent } from './components/utils/calendar-util/calendar-util.component';
export function momentAdapterFactory() {
  return adapterFactory(moment);
};
import { FlatpickrModule } from 'angularx-flatpickr';
import { HttpClientModule } from '@angular/common/http';
import { CrearEventoComponent } from './modals/modal-calendario/crear-evento/crear-evento.component';
import { registerLocaleData } from '@angular/common';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register/register.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar/sidebar.component';
import { HeaderTestComponent } from './components/admin/header-test/header-test.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { TareasComponent } from './pages/tareas/tareas.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { AgregarmateriaComponent } from './modals/materias/agregarmateria/agregarmateria/agregarmateria.component';
import { ActualizarmateriaComponent } from './modals/materias/actualizarmateria/actualizarmateria/actualizarmateria.component';
import { LoadingComponent } from './utils/loading/loading.component';
import { ModalTareasComponent } from './modals/modal-tareas/modal-tareas.component';
import { ActualizarTareaComponent } from './modals/modal-tareas/actualizar-tarea/actualizar-tarea.component';
import { AgregarTareaComponent } from './modals/modal-tareas/agregar-tarea/agregar-tarea.component';
import { RecuperarContrasenaComponent } from './modals/recuperar-contrasena/recuperar-contrasena.component';
import { AnadirAmigosComponent } from './modals/anadir-amigos/anadir-amigos.component';
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { VerAmigosComponent } from './components/ver-amigos/ver-amigos.component';

import localeEs from '@angular/common/locales/es';
import { es } from 'date-fns/locale';
registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    ErrorComponent,
    CalendarUtilComponent,
    CrearEventoComponent,
    RegisterComponent,
    SidebarComponent,
    HeaderTestComponent,
    PerfilComponent,
    HomeComponent,
    TareasComponent,
    MateriasComponent,
    HorarioComponent,
    AgregarmateriaComponent,
    ActualizarmateriaComponent,
    LoadingComponent,
    ModalTareasComponent,
    ActualizarTareaComponent,
    AgregarTareaComponent,
    RecuperarContrasenaComponent,
    AnadirAmigosComponent,
    VerAmigosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    FormsModule,
    FlatpickrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    CalendarModule.forRoot({ 
      provide: DateAdapter, 
      useFactory: momentAdapterFactory }),
      HttpClientModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [{ provide: es, useValue: 'es'}, CalendarComponent],
  bootstrap: [AppComponent,CalendarComponent]
})
export class AppModule { }
