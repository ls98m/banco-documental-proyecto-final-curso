import { getAlumnos } from "./alumnos.js";

getAlumnos().then((alumnos)=>{
    for (const alumno of alumnos) {
        let div = document.createElement('div');
        let divNombre = document.createElement('div').innerHTML = alumno.nombre;
        let divApellidos = document.createElement('div').innerHTML = alumno.apellidos;
        let divActions = document.createElement('div');
        let divEdit =  document.createElement('div');
        let edit = document.createElement('button');
        edit.setAttribute('id',alumno._id);
        edit.className = "btn-edit";
        div.append(divNombre);
        div.append(divApellidos);
        div.append(divEdit.append(edit));
        document.body.append(div);
      }
})
