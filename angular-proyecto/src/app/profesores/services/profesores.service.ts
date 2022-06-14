import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookiesService } from 'src/app/cookies/cookies.service';
import { Profesor } from 'src/app/profesores';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private http: HttpClient,private cookieServices:CookiesService) { 
  }

  profesor!:Profesor

  private URL = 'http://localhost:8000/api/gestion/profesores';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + this.cookieServices.getToken()
    })
  };

  get(): Observable<Profesor> {
    return this.http.get<Profesor>(this.URL,this.httpOptions);
  }

  update(profesor: Profesor): Observable<any> { 
    return this.http.put(this.URL+'/'+profesor.id, profesor, this.httpOptions);
  }

  insert(profesor: Profesor): Observable<any> { 
    this.profesor = profesor;
    console.log(this.profesor)
    return this.http.post(this.URL,JSON.stringify(profesor), this.httpOptions);
  }

  delete(id: string): Observable<any> { 
    return this.http.delete(this.URL+'/'+id,this.httpOptions);
  }

}
