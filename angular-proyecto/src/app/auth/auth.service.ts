import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CookiesService } from '../cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:8000/api/';
  
  httpOptionsNoAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
     })
  };

  httpOptionsAuth = {
    headers: new HttpHeaders({ 
      'Authorization' : 'Bearer ' + this.cookieServices.getToken()
    })
  };

  constructor(private http:HttpClient,private cookieServices:CookiesService) { 
  }

  sendEmailUpdatePassword(email:string){
    let user = new User();
    user.email = email;
    return this.http.post(this.URL+"sendEmailChangePass",JSON.stringify(user),this.httpOptionsNoAuth);
  }

  getEmailByToken(user:User){
    return this.http.post(this.URL+"getEmailByToken",JSON.stringify(user),this.httpOptionsNoAuth);
  }

  login(user:User) {
    return this.http.post<User>(this.URL+"login",JSON.stringify(user), this.httpOptionsNoAuth);
  }

  logout() {
    const headers = new HttpHeaders().set(
      'Authorization','Bearer ' + this.cookieServices.getToken()
    )
    return this.http.get(this.URL+"logout",{
      headers:headers
    });
  }


  details(token:any){
    return this.http.get(this.URL+"details",this.getHttpHeaderAuth(token));
  }

  register(user:User){
    return this.http.post<User>(this.URL+"register",JSON.stringify(user), this.httpOptionsNoAuth);
  }
  
  updatePass(user:User){
    return this.http.post(this.URL+"updatePass",JSON.stringify(user), this.httpOptionsNoAuth);
  }



  /*--- DEVUELVE UN HTTP HEADER ADAPTADA AL TOKEN----*/
  private getHttpHeaderAuth(token:any): any {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization":"Bearer " + token
       })
    };
    return header
  }
}
