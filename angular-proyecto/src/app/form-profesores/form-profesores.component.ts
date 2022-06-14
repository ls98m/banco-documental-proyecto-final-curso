import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from '../profesores';
import { ProfesoresService } from '../profesores/services/profesores.service';

@Component({
  selector: 'app-form-profesores',
  templateUrl: './form-profesores.component.html',
  styleUrls: ['./form-profesores.component.css']
})
export class FormProfesoresComponent implements OnInit {

  public formProfesores!:FormGroup;

  public isEdit!: boolean;

  public id!:any

  public profesor!:Profesor

  public nombre!:string

  res:any

  constructor(private formBuilder: FormBuilder,private activateRoute:ActivatedRoute,private profesoresService:ProfesoresService,private router:Router) { }

  ngOnInit(): void {
    this.importInfo();
    this.importForms();
  }

  importInfo():void {
    this.activateRoute.paramMap.subscribe(
      (params) => { 
      this.id = params.get('id'); 
      this.profesor = JSON.parse(localStorage.getItem('profesoredit'+this.id) || '{}');
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
    }
    );
  }

  importForms(): void {
    this.formProfesores = this.formBuilder.group({
      nombre: [this.profesor.nombre,[Validators.required,Validators.maxLength(20)]],
      apellidos: [this.profesor.apellidos,[Validators.required,Validators.maxLength(20)]]
    })
  }

  add(){
    this.importValuesToObject()
    if(this.getValidationForm()){
      this.profesoresService.insert(this.profesor).subscribe(
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
        }
        )
    }

    this.removeLocalStorage();
  }

  edit(){
    this.importValuesToObject()
    if(this.getValidationForm()){
      this.profesoresService.update(this.profesor).subscribe(res=>{
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
        }
        )
    }
    this.removeLocalStorage();

  }

  goBack():void {
    this.router.navigate(['/gestion/profesores/']);
  }

  getValidationForm(): boolean {
    if(this.formProfesores.valid){
      return true;
    }
      return false;
  }

  removeLocalStorage(){
    localStorage.removeItem('profesoredit'+this.id);
  }


  importValuesToObject(): void{
    this.profesor.nombre = this.formProfesores.get('nombre')?.value;      
    this.profesor.apellidos = this.formProfesores.get('apellidos')?.value;
  }  

  }

