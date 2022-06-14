<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\ProfesorController;
//use Jenssegers\Mongodb\Eloquent\Model;

class Profesor extends Model
{
    protected $connection = 'mysql';

    protected $table = 'profesores';
    
    //DESACTIVA LOS REGISTROS DE CREATED_AT Y UPDATED_AT
    public $timestamps = false;

    //CAMPOS QUE SE PUEDEN RELLLENAR MASIVAMENTE DESDE UN FORMULARIO
    protected $fillable = [
        'nombre','apellidos'
    ];

    //CAMPOS QUE NO SE PUEDEN RELLENAR DESDE UN FORMULARIO
    protected $guarded = [
        'id'
    ];
}
