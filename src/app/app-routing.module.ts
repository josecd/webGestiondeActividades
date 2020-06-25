import { LoginComponent } from './components/login/login/login.component';
import { ErrorComponent } from './components/error/error/error.component';
import { CalendarComponent } from './components/calendar/calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearEventoComponent } from './modals/modal-calendario/crear-evento/crear-evento.component';
import { RegisterComponent } from './components/register/register/register.component';


const routes: Routes = [
  { path: '',redirectTo: 'calendario',pathMatch: 'full'},
  { path: 'entrar', component: LoginComponent},
  { path: 'resgistro', component: RegisterComponent},

  { path: 'calendario', component: CalendarComponent},
  { path: 'crear-evento/:id', component: CrearEventoComponent},
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
