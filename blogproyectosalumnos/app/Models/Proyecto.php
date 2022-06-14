<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\ProyectoController;
//use Jenssegers\Mongodb\Eloquent\Model;

class Proyecto extends Model
{
    protected $connection = 'mysql';
    
    protected $table = 'proyectos';

    //DESACTIVA LOS REGISTROS DE CREATED_AT Y UPDATED_AT
    public $timestamps = false;

    //CAMPOS QUE SE PUEDEN RELLLENAR MASIVAMENTE DESDE UN FORMULARIO
    protected $fillable = [
        'titulo','descripcion','id_alumno','id_profesor','codigo','pdf','presentacion'
    ];

    //CAMPOS QUE NO SE PUEDEN RELLENAR DESDE UN FORMULARIO
    protected $guarded = [
        'id'
    ];
}
