import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from '../profesores';
import { ProfesoresService } from './services/profesores.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  constructor(private profesoresServices: ProfesoresService,private router:Router) { }

  res!:any
  profesores!:Profesor[]
  public profesorSelected!: Profesor
  mostrarCargando = true;

  borrar(profesor:Profesor) {
    this.profesoresServices.delete(profesor.id.toString()).subscribe(
      (res)=>{
      this.res = res;
     if(this.res['ok']){
      this.profesores.splice(this.profesores.indexOf(profesor),1);
     } else {
      alert(this.res['msg'])
     } 
    },
    (error) => {
      if(error.status == 401){
        this.router.navigate(['login'])
      }})
  }

  prepararParaEditar(profesor:Profesor){
    this.profesorSelected = profesor;
    localStorage.setItem('profesoredit'+profesor.id,JSON.stringify(this.profesorSelected));
    this.router.navigate(['/gestion/profesores/editar/', profesor.id])
  }

  prepararParaCrear(){
    this.router.navigate(['/gestion/profesores/crear/'])
  }
  
  cargarInfo() {
      this.profesoresServices.get().subscribe(
        (res)=>{
        this.res = res;
        this.profesores = this.res.data
        this.mostrarCargando = false;
      },
      (error) => {
        if(error.status == 401){
          this.router.navigate(['login'])
        }
        }
        )
    
  }

  ngOnInit(): void {
      this.cargarInfo()
    }
   
}
