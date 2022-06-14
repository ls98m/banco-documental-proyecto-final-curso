import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(
    private authServices:AuthService,
    private formBuilder: FormBuilder,private router:Router) { }
  public formUpdatePassword!:FormGroup;
  email!:string
  res!:any

  sendEmail(){

  if(this.getValidationForm()){
    this.email = this.formUpdatePassword.get('email')?.value;
    this.authServices.sendEmailUpdatePassword(this.email).subscribe(
        (res)=> {
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
    email: [this.email,[Validators.required,Validators.email]],
  })
}


getValidationForm(): boolean {
  if(this.formUpdatePassword.valid){
      return true;
  }
    return false;
}


ngOnInit(): void {
 this.importForms()
}

}
