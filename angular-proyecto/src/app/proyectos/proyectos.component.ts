import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from '../alumno';
import { Proyecto } from '../proyecto';
import { ProyectosService } from './services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  constructor(private proyectosServices: ProyectosService,private router:Router) { }

  res!:any;
  proyectos!:Proyecto[];
  mostrarCargando = true;

  public proyectoSelected!: Proyecto

  borrar(proyecto:Proyecto) {
    this.proyectosServices.delete(proyecto.id.toString()).subscribe(
      (res)=>{
      this.res = res;
     if(this.res['ok']){
      this.proyectos.splice(this.proyectos.indexOf(proyecto),1);
     } else {
      alert(this.res['msg'])
     } 
    },
    (error)=>{
      if(error.status == 401) {
        this.router.navigate(['login'])
      }
    })
  }

  prepararParaEditar(proyecto:Proyecto){
    this.proyectoSelected = proyecto;
    localStorage.setItem('proyecto'+proyecto.id,JSON.stringify(this.proyectoSelected));
    this.router.navigate(['/gestion/proyectos/editar/', proyecto.id])
  }

  prepararParaVer(proyecto:Proyecto){
    this.proyectoSelected = proyecto;
    localStorage.setItem('proyectover',JSON.stringify(this.proyectoSelected));
    this.router.navigate(['/gestion/proyectos/ver/', proyecto.id])
  }

  prepararParaCrear(){
    this.router.navigate(['/gestion/proyectos/crear/'])
  }
  
  cargarInfo() {
      this.proyectosServices.get().subscribe(
        (res)=>{
        this.res = res;
        this.proyectos = this.res.data
        this.mostrarCargando = false;
      },
      (error)=>{
        if(error.status == 401) {
          this.router.navigate(['login'])
        }
      })
    
  }

  ngOnInit(): void {
      this.cargarInfo()
    }
   
}