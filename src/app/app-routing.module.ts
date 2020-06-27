import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login/login.component';
import { ErrorComponent } from './components/error/error/error.component';
import { CalendarComponent } from './components/calendar/calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearEventoComponent } from './modals/modal-calendario/crear-evento/crear-evento.component';
import { RegisterComponent } from './components/register/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { TareasComponent } from './pages/tareas/tareas.component';
import { HorarioComponent } from './pages/horario/horario.component';
import { MateriasComponent } from './pages/materias/materias.component';



const routes: Routes = [
  { path: '',redirectTo: 'home',pathMatch: 'full'},
  { path: 'entrar', component: LoginComponent},
  { path: 'resgistro', component: RegisterComponent},

  { path: 'calendario', component: CalendarComponent },
  { path: 'crear-evento/:id', component: CrearEventoComponent},
  
  //Mis rutas
  {path: 'materias', component: MateriasComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'home', component: HomeComponent},
  {path: 'tareas', component: TareasComponent},
  {path: 'horario', component: HorarioComponent},


  
  
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
