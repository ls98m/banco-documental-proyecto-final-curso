import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosEscolaresComponent } from './cursos-escolares/cursos-escolares.component';
import { DetailsProyectosComponent } from './details-proyectos/details-proyectos.component';
import { FormAlumnosComponent } from './form-alumnos/form-alumnos.component';
import { FormCursosEscolaresComponent } from './form-cursos-escolares/form-cursos-escolares.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormProfesoresComponent } from './form-profesores/form-profesores.component';
import { FormProyectosComponent } from './form-proyectos/form-proyectos.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { FormUpdatePasswordComponent } from './form-update-password/form-update-password.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuGestionComponent } from './menu-gestion/menu-gestion.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  
  {path: '', redirectTo: 'home',pathMatch: 'full'},
  //mostrara la vista con los dos enlaces a ver todo y otro a gestion
  { path: 'home', component: HomeComponent },

  { path: 'sendEmail', component: UpdatePasswordComponent },

  { path: 'updatePassword/:token', component: FormUpdatePasswordComponent },


  //mostrara la vista con los 4 enlaces a gestion de cada componente
  { path: 'gestion', component: MenuGestionComponent },
  
  //mostrara la vista de proyectos.... no se si la realzire.
  { path: 'vertodo', component: CursosEscolaresComponent },
  
  //mostrara la vista con los dos enlaces a ver todo y otro a gestion
  
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: FormLoginComponent },
  { path: 'register', component: FormRegisterComponent },

  { path: 'updatePass', component: FormRegisterComponent },


  { path: 'gestion/cursosescolares', component: CursosEscolaresComponent },
  { path: 'gestion/cursosescolares/editar/:id', component: FormCursosEscolaresComponent },
  { path: 'gestion/cursosescolares/crear', component: FormCursosEscolaresComponent },

  { path: 'gestion/alumnos', component: AlumnosComponent },
  { path: 'gestion/alumnos/editar/:id', component: FormAlumnosComponent },
  { path: 'gestion/alumnos/crear', component: FormAlumnosComponent },


  { path: 'gestion/profesores', component: ProfesoresComponent },
  { path: 'gestion/profesores/editar/:id', component: FormProfesoresComponent },
  { path: 'gestion/profesores/crear', component: FormProfesoresComponent },

  { path: 'gestion/proyectos', component: ProyectosComponent },
  { path: 'gestion/proyectos/editar/:id', component: FormProyectosComponent },
  { path: 'gestion/proyectos/crear', component: FormProyectosComponent },
  { path: 'gestion/proyectos/ver/:id', component: DetailsProyectosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
