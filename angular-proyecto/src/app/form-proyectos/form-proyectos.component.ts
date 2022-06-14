import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { Alumno } from '../alumno';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { CursoEscolar } from '../cursoEscolar';
import { Profesor } from '../profesores';
import { ProfesoresService } from '../profesores/services/profesores.service';
import { Proyecto } from '../proyecto';
import { ProyectosService } from '../proyectos/services/proyectos.service';

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit {

  public formProyecto!:FormGroup;
  res:any

  public isEdit!: boolean;

  public id!:any

  public alumnos!:Alumno[]

  public profesores!:Profesor[]

  //VARIABLES UTILIZADAS PARA PASAR DATOS AL FORMULARIO DE EDICION
  proyecto!:Proyecto
  curso!:CursoEscolar
  profesor!:Profesor

  //FICHEROS
  presentacion!:File
  pdf!:File
  codigo!:File

  info:any

  constructor(
    private formBuilder: FormBuilder,
    private activateRoute:ActivatedRoute,
    private proyectosService:ProyectosService,
    private alumnosService:AlumnosService,
    private profesoresService:ProfesoresService,
    private router:Router) { }

  ngOnInit(): void {
    this.importInfo();
    this.importForms();
  }

  importInfo():void {
    this.alumnosService.get().subscribe(
      (res)=>{
      this.res = res;
      this.alumnos = this.res.data
    },
    (error)=>{
      if(error.status == 401) {
        this.router.navigate(['login'])
      }
    }
    );

    this.profesoresService.get().subscribe(
      (res)=>{
      this.res = res;
      this.profesores = this.res.data
    },
    (error)=>{
      if(error.status == 401) {
        this.router.navigate(['login'])
      }
    });

    this.activateRoute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      this.proyecto = JSON.parse(localStorage.getItem('proyecto'+this.id) || '{}');
      this.proyecto.codigo = this.codigo;
      this.proyecto.pdf = this.pdf;
      this.proyecto.presentacion = this.presentacion;
      if(this.id){
        this.isEdit = true
      } else {
        this.isEdit = false
      }
  });
  }

  importForms(): void {
    this.formProyecto = this.formBuilder.group({
      titulo: [this.proyecto.titulo,[Validators.required,Validators.maxLength(20)]],
      descripcion: [this.proyecto.descripcion,[Validators.required,Validators.maxLength(100)]],
      id_alumno: [this.proyecto.id_alumno,[Validators.required]],
      id_profesor: [this.proyecto.id_profesor,[Validators.required]],
      pdf: ['',[]],
      codigo: ['',[]],
      presentacion: ['',[]]
    })
  }

  validatorPdf(input:FormControl){
    let valueField = input.value;
    if(valueField.type != 'application/pdf'){
      return {invalidFile:true}
    }
    return null
  }

  validatorZipRar(input:FormControl){
    let valueField = input.value;
    if(valueField.type == 'application/x-zip-compressed' || valueField.type == 'application/x-rar-compressed' ){
     return null
    }
    return {invalidFile:true}
  }


  changePdf(event:any) {
    this.proyecto.pdf = event.target.files[0];
  }

  changeCodigo(event:any) {
    this.proyecto.codigo = event.target.files[0];
  }

  changePresentacion(event:any) {
    this.proyecto.presentacion = event.target.files[0];
  }

  add(){
    this.importValuesToObject()
    if(this.getValidationForm()){
      this.proyectosService.insert(this.proyecto).subscribe(
        (res)=>{
        this.res = res;
        if(!this.res['ok']){
          this.goBack()
          alert(this.res['msg']);
        } else {
          this.goBack();
        } 
      },
      (error)=>{
        if(error.status == 401) {
          this.router.navigate(['login'])
        }
      })
    }

    this.removeLocalStorage();
  }

  edit(){
    this.importValuesToObject()
    if(this.getValidationForm()){
      this.proyectosService.update(this.proyecto).subscribe(
        (res)=>{
        this.res = res;
        if(!this.res['ok']){     
          this.goBack()   
          alert(this.res['msg']);
        } else {
          this.goBack();
        } 
      },
      (error)=>{
        if(error.status == 401) {
          this.router.navigate(['login'])
        }
      })
    }
    
    this.removeLocalStorage();

  }

  goBack():void {
    this.router.navigate(['/gestion/proyectos/']);
  }

  getValidationForm(): boolean {
    if(this.formProyecto.valid){
      return true;
    }
      return false;
  }

  removeLocalStorage(){
    localStorage.removeItem('proyecto'+this.id);
  }

  importValuesToObject(): void{
    this.proyecto.titulo = this.formProyecto.get('titulo')?.value;
    this.proyecto.descripcion = this.formProyecto.get('descripcion')?.value;
    this.proyecto.id_alumno = this.formProyecto.get('id_alumno')?.value;      
    this.proyecto.id_profesor = this.formProyecto.get('id_profesor')?.value; 
  }  

  }
