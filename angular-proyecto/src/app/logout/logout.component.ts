import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CookiesService } from '../cookies/cookies.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authServices:AuthService,private cookieServices:CookiesService,private router:Router) { }
  res!:any

  ngOnInit(): void {
    this.authServices.logout().subscribe((res)=>{
      this.cookieServices.removeToken()
      this.router.navigate(['login']);
    });
  }
}
