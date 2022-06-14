<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profesor;
use Illuminate\Support\Facades\DB;

class ProfesorController extends Controller
{
    public function index(){
        $profesores = Profesor::all();
        return response()->json([
            "data"=>$profesores,
            "ok"=>true
         ]);
    }
        
    public function store(Request $request){ 
        try{
            DB::beginTransaction();
            trim($request->nombre);
            trim($request->apellidos);
             $request->validate([
            'nombre' => 'required|string',
            'apellidos' => 'required|string'
            ]);
            $profesor = new Profesor;
            $profesor->nombre = $request->nombre;
            $profesor->apellidos = $request->apellidos;
            $profesor->save();
            DB::commit();
            return response()->json([
                "data"=>$profesor,
                "ok"=>true
            ]);
        }catch(\Exception $ex){
            DB::rollback();
            return response()->json([
                "ok"=>false,
                "msg"=> "ERROR AL INSERTAR EL PROFESOR"
            ]);
        }
    }

    public function update(Request $request){
        try{
            DB::beginTransaction();
            trim($request->nombre);
            trim($request->apellidos);
            $request->validate([
                'nombre' => 'required|string',
                'apellidos' => 'required|string'
            ]);
            $profesor =Profesor::findOrFail($request->id);
            $profesor->nombre = $request->nombre;
            $profesor->apellidos = $request->apellidos;
            $profesor->save();
            DB::commit();
            return response()->json([
                "data"=>$profesor,
                "ok"=>true
             ]);
        } catch(\Exception $ex){
            DB::rollback();
            return response()->json([
                "ok"=>false,
                "msg"=>"MODIFICACION PROFESOR ERRONEA"
         ]);
        }
    }

    public function destroy($id){
        try{
            DB::beginTransaction();
            $profesor = Profesor::findOrFail($id);
            $profesor->delete();
            DB::commit();
            return response()->json([
                "data"=>$profesor,
                "ok"=>true
            ]);
        }catch(\Exception $ex){
            DB::rollback();
            return response()->json([
                "msg"=>$ex->getMessage(),
                "ok"=>false
            ]);
        }
    }

}