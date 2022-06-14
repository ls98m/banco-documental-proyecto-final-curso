import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../proyecto';

@Component({
  selector: 'app-details-proyectos',
  templateUrl: './details-proyectos.component.html',
  styleUrls: ['./details-proyectos.component.css']
})
export class DetailsProyectosComponent implements OnInit {

  proyecto!:Proyecto

  constructor() { }

  ngOnInit(): void {
    this.importInfo();
  }

  importInfo(): void {
    this.proyecto = JSON.parse(localStorage.getItem('proyectover') || '{}');
  }

  removeLocalStorage(){
    localStorage.removeItem('proyectover');
  }

}
