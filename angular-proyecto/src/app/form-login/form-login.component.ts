import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CookiesService } from '../cookies/cookies.service';
import { User } from '../user';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit { 

  constructor(private cookieServices:CookiesService,private authServices:AuthService,private cookieService:CookiesService,private formBuilder: FormBuilder,private router:Router) { }
    public formLogin!:FormGroup;
    public email!:string
    public password!:string
    res:any
    public isLogged = false;

    login(){
    if(this.getValidationForm()){
      let user = new User();
      user.email = this.formLogin.get('email')?.value
      user.password = this.formLogin.get('password')?.value
      this.authServices.login(user).subscribe(
        (res) => {
        this.res = res;
       if(this.res.ok){
         this.cookieService.saveToken(this.res.token);
         this.router.navigate(['/home'])
       }
      },
      (error)=> {
        alert(error);
      })
    }
    
  }

  importForms(): void {
    this.formLogin = this.formBuilder.group({
      email: [this.email,[Validators.required,Validators.email]],
      password: [this.password,[Validators.required]]
    })
  }

  getValidationForm(): boolean {
    if(this.formLogin.valid){
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
