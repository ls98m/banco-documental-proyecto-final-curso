import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from '../alumno';
import { CookiesService } from '../cookies/cookies.service';
import { AlumnosService } from './services/alumnos.service';
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  
  constructor(private alumnosService: AlumnosService,private router:Router) { }

  res:any
  alumnos!:Alumno[]
  public alumnoSelected!: Alumno
  msgChange!:string
  mostrarCargando = true

  borrar(curso:Alumno) {
    this.alumnosService.delete(curso.id.toString()).subscribe(
      (res)=>{
      this.res = res;
     if(this.res['ok']){
      this.alumnos.splice(this.alumnos.indexOf(curso),1);
     } else {
      alert(this.res['msg'])
     } 
    },
    (error) => {
      if(error.status == 401){
        this.router.navigate(['login'])
      }
    })
  }

  prepararParaEditar(curso:Alumno){
    this.alumnoSelected = curso;
    localStorage.setItem('alumnoedit'+curso.id,JSON.stringify(this.alumnoSelected));
    this.router.navigate(['/gestion/alumnos/editar/', curso.id])
  }

  prepararParaCrear(){
    this.router.navigate(['/gestion/alumnos/crear/'])
  }
  
  cargarInfo() {
      this.alumnosService.get().subscribe(res=>{
        this.res = res;
        this.alumnos = this.res.data
        this.mostrarCargando = false;
      },
      (error) => {
          if(error.status == 401){
            this.router.navigate(['/login'])  
          }
      })
  }

  ngOnInit(): void {
      this.cargarInfo()
    }
   
}
