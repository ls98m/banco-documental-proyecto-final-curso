import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CookiesService } from '../cookies/cookies.service';
import { User } from '../user';
@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  
  constructor(private authServices:AuthService,private formBuilder: FormBuilder,private cookieServices:CookiesService,private router:Router) { }
  public formRegister!:FormGroup;
  password!:string;
  email!:string
  c_password!:string
  name!:string
  user = new User();
  res!:any
  register(){

  if(this.getValidationForm()){
    this.user.email = this.formRegister.get('email')?.value;
    this.user.name = this.formRegister.get('name')?.value;
    this.user.password = this.formRegister.get('password')?.value;
    this.user.c_password = this.formRegister.get('c_password')?.value;
    this.authServices.register(this.user).subscribe(
        (res)=> {
          this.res = res;
          if(this.res.ok){
            this.cookieServices.saveToken(this.res.token);
            this.router.navigate([''])
          }
        },
        (error)=>{
          this.res = error
        })
  }
}

importForms(): void {
  this.formRegister = this.formBuilder.group({
    email: [this.email,[Validators.required,Validators.email]],
    name: [this.name,[Validators.required,Validators.maxLength(15)]],
    password: [this.password,[Validators.required,Validators.minLength(5)]],
    c_password: [this.c_password,[Validators.required,Validators.minLength(5)]]
  })
}

getValidationForm(): boolean {
  if(this.formRegister.valid){
      return true;
  }
    return false;
}


ngOnInit(): void {
  if(this.cookieServices.existTokenCookie()){
    this.router.navigate(['/home'])
  }
 this.importForms()
}

}
