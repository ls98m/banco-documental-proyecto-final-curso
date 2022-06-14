import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from '../cookies/cookies.service';
  
@Component({
  selector: 'app-menu-gestion',
  templateUrl: './menu-gestion.component.html',
  styleUrls: ['./menu-gestion.component.css']
})
export class MenuGestionComponent implements OnInit {

  constructor(private router:Router,private cookieServices:CookiesService) { }
  res!:any

  ngOnInit(): void {
    if(!this.cookieServices.existTokenCookie()){
      this.router.navigate(['login'])
    }
  }

  goCursos() {
    this.router.navigate(['/gestion/cursosescolares'])
  }

  goProfesores() {
    this.router.navigate(['/gestion/profesores'])
  }

  goAlumnos() {
    this.router.navigate(['/gestion/alumnos'])
  }

  goProyectos() {
    this.router.navigate(['/gestion/proyectos'])
  }

}
