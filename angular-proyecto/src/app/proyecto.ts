export interface Proyecto {
    id: number;
    titulo: string;
    descripcion: string;
    pdf: File;
    codigo:File;
    presentacion:File;
    id_alumno: number;
    nombre_alumno: string;
    apellidos_alumno: string;
    id_profesor: number;
    nombre_profesor: string;
    apellidos_profesor: string;
    id_curso_escolar: number;
    nombre_curso_escolar: string;
    temporada_curso_escolar: string;
  }