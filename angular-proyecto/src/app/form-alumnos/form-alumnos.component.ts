import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../alumno';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { CursoEscolar } from '../cursoEscolar';
import { CursosEscolaresService } from '../cursos-escolares/services/cursos-escolares.service';
@Component({
  selector: 'app-form-alumnos',
  templateUrl: './form-alumnos.component.html',
  styleUrls: ['./form-alumnos.component.css']
})
export class FormAlumnosComponent implements OnInit {

  public formAlumnos!:FormGroup;

  public isEdit!: boolean;

  public id!:any

  //ALUMNO QUE CONTIENE LOS DATOS Y EL CUAL SE PASA EN EL FORMULARIO
  public alumno!:Alumno

  public nombre!:string

  //ARRAY CURSOS ESCOLARES 
  cursosEscolares!:CursoEscolar[]

  res!:any

  constructor(private cursosEscolaresService:CursosEscolaresService,private formBuilder: FormBuilder,private activateRoute:ActivatedRoute,private alumnosService:AlumnosService,private router:Router) { }
  ngOnInit(): void {
    this.importInfo();
    this.importForms();
  }

  importInfo():void {
    this.cursosEscolaresService.get().subscribe(res=>{
      this.res = res;
      this.cursosEscolares = this.res.data
    });

    this.activateRoute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      this.alumno = JSON.parse(localStorage.getItem('alumnoedit'+this.id) || '{}');
      if(this.id){
        this.isEdit = true
      } else {
        this.isEdit = false
      }
  });
  }

  importForms(): void {
    this.formAlumnos = this.formBuilder.group({
      nombre: [this.alumno.nombre,[Validators.required,Validators.pattern('^[a-zA-ZÑñ ]{1,20}$')]],
      apellidos: [this.alumno.apellidos,[Validators.required,Validators.pattern('^[a-zA-ZñÑ ]{1,25}$')]],
      id_curso_escolar: [this.alumno.id_curso_escolar,[Validators.required]]
    })
  }

  add(){
    this.importValuesToObject()
    if(this.getValidationForm()){
      this.alumnosService.insert(this.alumno).subscribe(
        (res)=>{
        this.res = res;
        if(!this.res['ok']){
          this.goBack()
          alert(this.res['msg']);
        } else {
          this.goBack();
        } 
      },
      (error) =>{
        if(error.status == 401){
          this.router.navigate(['login'])
        }
      })
    }

    this.removeLocalStorage();
  }

  edit(){
    this.importValuesToObject()
    if(this.getValidationForm()){
      this.alumnosService.update(this.alumno).subscribe(
        (res)=>{
        this.res = res;
        if(!this.res['ok']){
          this.goBack()
          alert(this.res['msg']);
        } else {
          this.goBack();
        } 
      },
      (error) => {
        if(error.status == 401){
          this.router.navigate(['login'])
        }
      })
    }
    this.removeLocalStorage();

  }

  goBack():void {
    this.router.navigate(['/gestion/alumnos/']);
  }

  getValidationForm(): boolean {
    if(this.formAlumnos.valid){
      return true;
    }
      return false;
  }

  removeLocalStorage(){
    localStorage.removeItem('alumnoedit'+this.id);
  }


  importValuesToObject(): void{
    this.alumno.nombre = this.formAlumnos.get('nombre')?.value;      
    this.alumno.apellidos = this.formAlumnos.get('apellidos')?.value;
    this.alumno.id_curso_escolar = this.formAlumnos.get('id_curso_escolar')?.value;
  }  

  }

