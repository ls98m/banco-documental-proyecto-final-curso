import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosEscolaresComponent } from './cursos-escolares/cursos-escolares.component';
import { FormCursosEscolaresComponent } from './form-cursos-escolares/form-cursos-escolares.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormAlumnosComponent } from './form-alumnos/form-alumnos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { FormProyectosComponent } from './form-proyectos/form-proyectos.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { FormProfesoresComponent } from './form-profesores/form-profesores.component';
import { DetailsProyectosComponent } from './details-proyectos/details-proyectos.component';
import { HomeComponent } from './home/home.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { MenuGestionComponent } from './menu-gestion/menu-gestion.component';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { FormUpdatePasswordComponent } from './form-update-password/form-update-password.component';
import { LogoutComponent } from './logout/logout.component';
@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    CursosEscolaresComponent,
    FormCursosEscolaresComponent,
    FormAlumnosComponent,
    ProyectosComponent,
    FormProyectosComponent,
    ProfesoresComponent,
    FormProfesoresComponent,
    DetailsProyectosComponent,
    HomeComponent,
    FormLoginComponent,
    FormRegisterComponent,
    MenuGestionComponent,
    UpdatePasswordComponent,
    FormUpdatePasswordComponent,
    LogoutComponent,    
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
