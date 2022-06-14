import { Injectable } from '@angular/core';
import { CursoEscolar } from 'src/app/cursoEscolar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { CookiesService } from 'src/app/cookies/cookies.service';
@Injectable({
  providedIn: 'root'
})
export class CursosEscolaresService {

  constructor(private http: HttpClient,private cookieServices:CookiesService) { 
  }

  cursoEscolar!:CursoEscolar

  private URL = 'http://localhost/api/gestion/cursosescolares';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + this.cookieServices.getToken()
    })
  };

  get(): Observable<CursoEscolar> {
    return this.http.get<CursoEscolar>(this.URL,this.httpOptions);
  }

  update(cursoEscolar: CursoEscolar): Observable<any> { 
    return this.http.put(this.URL+'/'+cursoEscolar.id, cursoEscolar, this.httpOptions);
  }

  insert(cursoEscolar: CursoEscolar): Observable<any> { 
    this.cursoEscolar = cursoEscolar;
    return this.http.post(this.URL,JSON.stringify(cursoEscolar), this.httpOptions);
  }

  delete(id: string): Observable<any> { 
    return this.http.delete(this.URL+'/'+id,this.httpOptions);
  }

  
}
