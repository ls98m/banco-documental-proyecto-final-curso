import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mostrar=false
  constructor() { }


  desplegarMenu(){
    if(!this.mostrar){
      this.mostrar = true;
    } else {
      this.mostrar = false;
    }
  }

  cerrarSesion(){
    
  }

  title = 'BLOG PROYECTOS';

}
