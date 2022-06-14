<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Jenssegers\Mongodb\Eloquent\Model;
use App\Http\Controllers\CursosEscolaresController;
use Illuminate\Database\Eloquent\Model;

class CursosEscolares extends Model
{
    protected $connection = 'mysql';

    protected $table = 'cursos_escolares';
    
    //DESACTIVA LOS REGISTROS DE CREATED_AT Y UPDATED_AT
    public $timestamps = false;

    //CAMPOS QUE SE PUEDEN RELLLENAR MASIVAMENTE DESDE UN FORMULARIO
    protected $fillable = [
        'nombre','temporada'
    ];

    //CAMPOS QUE NO SE PUEDEN RELLENAR DESDE UN FORMULARIO
    protected $guarded = [
        'id'
    ];
}
