import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from '../cookies/cookies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private cookieServices:CookiesService) { }

  res:any
  ngOnInit(): void {
    if(!this.cookieServices.existTokenCookie()){
      this.router.navigate(['login'])
    }
  }

  goGestion(){
    this.router.navigate(['/gestion'])
  }

  goVerTodo(){
    this.router.navigate(['/gestion/proyectos']);
  }

}
