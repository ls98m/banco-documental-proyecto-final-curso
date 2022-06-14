import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoEscolar } from '../cursoEscolar';
import { CursosEscolaresService } from '../cursos-escolares/services/cursos-escolares.service';
@Component({
  selector: 'app-form-cursos-escolares',
  templateUrl: './form-cursos-escolares.component.html',
  styleUrls: ['./form-cursos-escolares.component.css']
})
export class FormCursosEscolaresComponent implements OnInit {

  @Input('curso') cursoSelected!:CursoEscolar

  public formCursos!:FormGroup;

  public isEdit!: boolean;

  public id!:any

  public curso!:CursoEscolar

  public nombre!:string

  res:any

  constructor(private formBuilder: FormBuilder,private activateRoute:ActivatedRoute,private cursosService:CursosEscolaresService,private router:Router) { }

  ngOnInit(): void {
    this.importInfo();
    this.importForms();
  }

  importInfo():void {
    this.activateRoute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      this.curso = JSON.parse(localStorage.getItem('cursoescolaredit'+this.id) || '{}');
      if(this.id){
        this.isEdit = true
      } else {
        this.isEdit = false
      }
  },
  (error) => {
    if(error.status == 401){
      this.router.navigate(['login'])
    }
  });
  }

  importForms(): void {
    this.formCursos = this.formBuilder.group({
      nombre: [this.curso.nombre,[Validators.required,Validators.maxLength(10)]],
      temporada: [this.curso.temporada,[Validators.required,Validators.pattern('^[0-9]{4}-[0-9]{4}$')]]
    })
  }

  add(){
    this.importValuesToObject()
    if(this.getValidationForm()){
      this.cursosService.insert(this.curso).subscribe(res=>{
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

  edit(){
    this.importValuesToObject()
    if(this.getValidationForm()){
      this.cursosService.update(this.curso).subscribe(res=>{
        this.res = res;
        if(!this.res['ok']){
          this.goBack()
          alert(this.res['msg']);
        } else {
          this.goBack();
        } 
      },(error) => {
        if(error.status == 401){
          this.router.navigate(['login'])
        }
      })
    }
    this.removeLocalStorage();

  }

  goBack():void {
    this.router.navigate(['/gestion/cursosescolares/']);
  }

  getValidationForm(): boolean {
    if(this.formCursos.valid){
      return true;
    }
      return false;
  }

  removeLocalStorage(){
    localStorage.removeItem('cursoescolaredit'+this.id);
  }


  importValuesToObject(): void{
    this.curso.nombre = this.formCursos.get('nombre')?.value;      
    this.curso.temporada = this.formCursos.get('temporada')?.value;
  }  

  }

