import { MaterialModule } from './material-module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar/calendar.component';
import { LoginComponent } from './components/login/login/login.component';
import { HeaderComponent } from './components/user/header/header/header.component';
import { ErrorComponent } from './components/error/error/error.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarUtilComponent } from './components/utils/calendar-util/calendar-util.component';
import { AngularFireModule } from '@angular/fire';
export function momentAdapterFactory() {
  return adapterFactory(moment);
};
import { FlatpickrModule } from 'angularx-flatpickr';
import { HttpClientModule } from '@angular/common/http';
import { CrearEventoComponent } from './modals/modal-calendario/crear-evento/crear-evento.component';
import { registerLocaleData } from '@angular/common';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeEs from '@angular/common/locales/es';
import { RegisterComponent } from './components/register/register/register.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar/sidebar.component';
import { HeaderTestComponent } from './components/admin/header-test/header-test.component';
registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    HeaderComponent,
    ErrorComponent,
    CalendarUtilComponent,
    CrearEventoComponent,
    RegisterComponent,
    SidebarComponent,
    HeaderTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CalendarModule.forRoot({ 
      provide: DateAdapter, 
      useFactory: momentAdapterFactory }),
      HttpClientModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [CalendarComponent],
  bootstrap: [AppComponent,CalendarComponent]
})
export class AppModule { }
