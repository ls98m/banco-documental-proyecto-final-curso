import { Component, OnInit } from '@angular/core';
import { CursoEscolar } from '../cursoEscolar';
import { CursosEscolaresService } from './services/cursos-escolares.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cursos-escolares',
  templateUrl: './cursos-escolares.component.html',
  styleUrls: ['./cursos-escolares.component.css']
})
export class CursosEscolaresComponent implements OnInit {
  
  constructor(private cursosService: CursosEscolaresService,private router:Router,private authServices:AuthService) { }

  res:any
  cursosEscolares!:CursoEscolar[]
  public cursoSelected!: CursoEscolar
  msgChange!:string
  public formCursos!:FormGroup;
  mostrarCargando = true;

  borrar(curso:CursoEscolar) {
    this.cursosService.delete(curso.id.toString()).subscribe(
      (res)=>{
      this.res = res;
     if(this.res['ok']){
      this.cursosEscolares.splice(this.cursosEscolares.indexOf(curso),1);
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

  prepararParaEditar(curso:CursoEscolar){
    this.cursoSelected = curso;
    localStorage.setItem('cursoescolaredit'+curso.id,JSON.stringify(this.cursoSelected));
    this.router.navigate(['/gestion/cursosescolares/editar/', curso.id])
  }

  prepararParaCrear(){
    this.router.navigate(['/gestion/cursosescolares/crear/'])
  }
  
  cargarInfo() {
      this.cursosService.get().subscribe(
        (res)=>{
        this.res = res;
        this.cursosEscolares = this.res.data
        this.mostrarCargando = false;
      },
      (error) => {
        if(error.status == 401){
          this.router.navigate(['login'])
        }
      })
    
  }

  ngOnInit(): void {
      this.cargarInfo()

    }
   
}
