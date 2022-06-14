import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CookiesService } from '../cookies/cookies.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-update-password',
  templateUrl: './form-update-password.component.html',
  styleUrls: ['./form-update-password.component.css']
})
export class FormUpdatePasswordComponent implements OnInit {

  constructor(private route:ActivatedRoute,private authServices:AuthService,private formBuilder: FormBuilder,private router:Router) { }
  public formUpdatePassword!:FormGroup;
  user = new User();
  res!:any
  public email = this.getEmail();

  sendNewPassword(){
    if(this.getValidationForm()){
      this.user.password = this.formUpdatePassword.get('password')?.value;
      this.user.c_password = this.formUpdatePassword.get('c_password')?.value;
      this.authServices.updatePass(this.user).subscribe(
          (res)=> {
            console.log(res)
            this.res = res;
            if(this.res.ok){
              this.router.navigate(['login'])
            }
        },
        (error)=>{
          alert(error)
        })
  }
}

importForms(): void {
  this.formUpdatePassword = this.formBuilder.group({
    password: [this.user.password,[Validators.required,Validators.minLength(6)]],
    c_password: [this.user.c_password,[Validators.required,Validators.minLength(6)]],

  })
}

getValidationForm(): boolean {
  if(this.formUpdatePassword.valid){
      return true;
  }
    return false;
}


ngOnInit(): void {
  this.getEmail()
  this.importForms()
  
}

getEmail() {
  this.route.paramMap.subscribe( paramMap => {
    this.user.token = paramMap.get('token') || '';
    this.authServices.getEmailByToken(this.user).subscribe(
      (res)=>{
        this.res = res;
        this.user.email = this.res.data[0].email;
      }
    )
  })
}

}
