import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { Proyecto } from 'src/app/proyecto';
import { CookiesService } from 'src/app/cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient,private cookieServices:CookiesService) { 
  }

  pdf!:File;


  proyecto!:Proyecto

  private URL='http://localhost:8000/api/gestion/proyectos';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.cookieServices.getToken()
    })
  };

  httpOptionForm = {
    headers: new HttpHeaders({ 
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer '+ this.cookieServices.getToken(),
      'Accept':'application/json'
    })
  }


  get(): Observable<Proyecto> {
    return this.http.get<Proyecto>(this.URL,this.httpOptionForm);
  }

  update(proyecto: Proyecto): Observable<any> { 
    let data = new FormData();
    const headers = new HttpHeaders().set(
      'Authorization','Bearer ' + this.cookieServices.getToken()
    )
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    data.append('id',proyecto.id.toString());
    data.append('id_alumno',proyecto.id_alumno.toString());
    data.append('id_profesor',proyecto.id_profesor.toString());
    data.append('titulo',proyecto.titulo);
    data.append('descripcion',proyecto.descripcion);
    if(proyecto.pdf){
      data.append('pdf',proyecto.pdf);
    }
    if(proyecto.presentacion){
      data.append('presentacion',proyecto.presentacion);
    }
    if(proyecto.codigo){
      data.append('codigo',proyecto.codigo);
    }
    
    return this.http.post(this.URL+"/edit",data,{
      headers:headers
    });
  }

  insert(proyecto: Proyecto): Observable<any> { 
    let data = new FormData();
    const headers = new HttpHeaders().set(
      'Authorization','Bearer ' + this.cookieServices.getToken()
    )
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    data.append('id_alumno',proyecto.id_alumno.toString());
    data.append('id_profesor',proyecto.id_profesor.toString());
    data.append('titulo',proyecto.titulo);
    data.append('descripcion',proyecto.descripcion);
    if(proyecto.pdf){
      data.append('pdf',proyecto.pdf);
    }
    if(proyecto.presentacion){
      data.append('presentacion',proyecto.presentacion);
    }
    if(proyecto.codigo){
      data.append('codigo',proyecto.codigo);
    }
    
    return this.http.post(this.URL,data,{
      headers:headers
    });
  }

  delete(id: string): Observable<any> { 
    return this.http.delete(this.URL+'/'+id,this.httpOptions);
  }

  

}
