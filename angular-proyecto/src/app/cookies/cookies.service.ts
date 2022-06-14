import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService:CookieService) { }

  private nameToken = 'token';
  
  removeToken():void {
    this.cookieService.deleteAll();  
  }


  existTokenCookie(): boolean {
   return this.cookieService.check(this.nameToken)
  }

  getToken(): String {
    return this.cookieService.get(this.nameToken);
  }
  
  saveToken(token:string):void{
    this.removeToken();
    this.cookieService.set('token',token);
  }
}
