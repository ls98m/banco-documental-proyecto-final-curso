import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { Alumno } from 'src/app/alumno';
import { CookiesService } from 'src/app/cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient,private cookieServices:CookiesService) { 
  }

  alumno!:Alumno

  private URL='http://localhost:8000/api/gestion/alumnos';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + this.cookieServices.getToken()
    })
  };

  get(): Observable<Alumno> {
    return this.http.get<Alumno>(this.URL,this.httpOptions);
  }

  update(alumno: Alumno): Observable<any> { 
    return this.http.put(this.URL+'/'+alumno.id, alumno, this.httpOptions);
  }

  insert(alumno: Alumno): Observable<any> { 
    this.alumno = alumno;
    return this.http.post(this.URL,JSON.stringify(alumno), this.httpOptions);
  }

  delete(id: string): Observable<any> { 
    return this.http.delete(this.URL+'/'+id,this.httpOptions);
  }



}
