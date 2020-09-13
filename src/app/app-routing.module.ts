import { LlamadaComponent } from './components/llamada/llamada.component';
import { ChatComponent } from './components/chat/chat.component';
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
  { path: '',redirectTo: 'inicio',pathMatch: 'full'},
  { path: 'entrar', component: LoginComponent},
  { path: 'registro', component: RegisterComponent},

  { path: 'calendario', component: CalendarComponent,canActivate: [AuthGuard] },
  { path: 'crear-evento/:id', component: CrearEventoComponent ,canActivate: [AuthGuard]},
  
  //Mis rutas
  {path: 'materias', component: MateriasComponent,canActivate: [AuthGuard]},
  {path: 'perfil', component: PerfilComponent,canActivate: [AuthGuard]},
  {path: 'inicio', component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'tareas', component: TareasComponent,canActivate: [AuthGuard]},
  {path: 'tareas/:id', component: TareasComponent,canActivate: [AuthGuard]},

  {path: 'horario', component: HorarioComponent,canActivate: [AuthGuard]},
  {path: 'horario/:id', component: HorarioComponent,canActivate: [AuthGuard]},

  {path: 'chat', component: ChatComponent,canActivate: [AuthGuard]},
  {path: 'llamada', component: LlamadaComponent,canActivate: [AuthGuard]},
  {path: 'llamada/:id', component: LlamadaComponent,canActivate: [AuthGuard]},





  
  
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
