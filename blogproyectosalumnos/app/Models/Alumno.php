<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Http\Controllers\AlumnoController;
//use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    protected $connection = 'mysql';
    
    protected $table = 'alumnos';

    //CAMPOS QUE SE PUEDEN RELLLENAR MASIVAMENTE DESDE UN FORMULARIO
    protected $fillable = [
        'nombre','apellidos','id_curso_escolar'
    ];

    //CAMPOS QUE NO SE PUEDEN RELLENAR DESDE UN FORMULARIO
    protected $guarded = [
        'id'
    ];



}
