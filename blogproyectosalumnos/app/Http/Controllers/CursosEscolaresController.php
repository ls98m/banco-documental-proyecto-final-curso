<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CursosEscolares;
use DB;
class CursosEscolaresController extends Controller
{
    public function index(){
        $cursos = CursosEscolares::all();
        return response()->json([
            "data"=>$cursos,
            "ok"=>true
         ]);
    }
        
    public function store(Request $request){
        try{
            DB::beginTransaction();   
            trim($request->nombre);
            trim($request->temporada);
            $request->validate([
                'nombre' => 'required|string',
                'temporada' => 'required|string|regex:/^[0-9]{4}-[0-9]{4}$/'
            ]);
            $curso = new CursosEscolares;
            $curso->nombre = $request->nombre;
            $curso->temporada = $request->temporada;
            $curso->save();
            DB::commit();
            return response()->json([
                "data"=>$curso,
                "ok"=>true
            ]);
        }catch(\Exception $ex){
            DB::rollback();
            return response()->json([
                "msg"=>'CURSO ESCOLAR NO INSERTADO',
                "ok"=>false
            ]);
        } 
    }

    public function update(Request $request){
        try{
            DB::beginTransaction();   
            trim($request->nombre);
            trim($request->temporada);
            $request->validate([
                'nombre' => 'required|string',
                'temporada' => 'required|string|regex:/^[0-9]{4}-[0-9]{4}$/'
            ]);
            $curso =CursosEscolares::findOrFail($request->id);
            $curso->nombre = $request->nombre;
            $curso->temporada = $request->temporada;
            $curso->save();
            DB::commit();
            return response()->json([
                "data"=>$curso,
                "ok"=>true
            ]);
        }catch(\Exception $ex){
            DB::rollback();
            return response()->json([
                "msg"=>'CURSO ESCOLAR NO ACTUALIZADO',
                "ok"=>false
            ]);
        }    
    }

    public function destroy($id){
        try{
            DB::beginTransaction();   
            $curso =CursosEscolares::findOrFail($id);
            $curso->delete();
            DB::commit();
            return response()->json([
                "data"=>$curso,
                "ok"=>true
            ]);
        }catch(\Exception $ex){
            DB::rollback();
            return response()->json([
                "msg"=>'CURSO ESCOLAR NO BORRADO',
                "ok"=>false
            ]); 
        }
    }

}
    
