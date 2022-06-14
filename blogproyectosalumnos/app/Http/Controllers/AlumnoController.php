<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alumno;
use App\Models\Proyecto;
use App\Models\CursosEscolares;
use Illuminate\Support\Facades\DB;

class AlumnoController extends Controller
{
    public function index(){
        $alumnos = Alumno::all();
        foreach($alumnos as $alumno) {
            $curso = CursosEscolares::find($alumno->id_curso_escolar);
            $alumno->nombre_curso_escolar = $curso->nombre;
            $alumno->id_curso_escolar = $curso->id;

        }
        return response()->json([
            "data"=>$alumnos,
            "ok"=>true
         ]);
    }
        
    public function store(Request $request){
        try{
            DB::beginTransaction(); 
            $request->validate([
                'nombre' => 'required|string',
                'apellidos' => 'required|string',
                'id_curso_escolar' => 'required'
            ]);
            $alumno = new Alumno();
            $alumno->nombre = $request->nombre;
            $alumno->apellidos = $request->apellidos;
            $curso =  CursosEscolares::find($request->id_curso_escolar);
            $alumno->id_curso_escolar = $curso->id;
            $alumno->save();
            DB::commit();
            return response()->json([
                "data"=>$alumno,
                "ok"=>true
            ]);
        }catch(\Exception $ex) {
            DB::rollBack();
            return response()->json([
                "ok"=>false,
                "msg"=>"INSERCCION ALUMNO ERRONEA"
            ]);
        }
    }

    public function update(Request $request){
        try{
            DB::beginTransaction(); 
            $request->validate([
                'nombre' => 'required|string',
                'apellidos' => 'required|string',
                'id_curso_escolar' => 'required',
            ]);
            $alumno = Alumno::find($request->id);
            $alumno->nombre = $request->nombre;
            $alumno->apellidos = $request->apellidos;
            $curso =  CursosEscolares::find($request->id_curso_escolar);
            $alumno->id_curso_escolar = $curso->id;
            $alumno->save();
            DB::commit();
            return response()->json([
                "data"=>$alumno,
                "ok"=>true
            ]);
        }catch(\Exception $ex){
            DB::rollBack();
            return response()->json([
                "ok"=>false,
                "msg"=>"ERROR AL ACTUALIZAR EL ALUMNO"
            ]);
        }          
    }

    public function destroy($id){
        try{
            DB::beginTransaction(); 
            $alumno = Alumno::findOrFail($id);               
            $alumno->delete();
                DB::commit();
                return response()->json([
                    "data"=>$alumno,
                    "ok"=>true
                ]);
        }catch(\Exception $ex){
            DB::rollBack();
            return response()->json([
                "ok"=>false,
                "msg" => "ERROR AL ELIMINAR ALUMNO"
             ]);
        }       
    }
}
