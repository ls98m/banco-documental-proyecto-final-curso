<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proyecto;
use App\Models\Profesor;
use App\Models\Alumno;
use App\Models\CursosEscolares;
use App\Models\AlumnosCursos;
use MongoDB;
use DB;
use Illuminate\Support\Facades\Storage;
use Jenssegers\Mongodb\Eloquent\Model;
use File;
use Symfony\Component\HttpFoundation\File\UploadedFile;


class ProyectoController extends Controller
{

    public function downloadPresentacionById($id){
        $db = (new MongoDB\Client)->archivos;
        $bucket = $db->selectGridFSBucket([
            'bucketName' => 'presentacion',
            'readPreference' => new MongoDB\Driver\ReadPreference(MongoDB\Driver\ReadPreference::RP_SECONDARY)
        ]);
        $grid = $bucket->getFilesCollection();
        $fileDB = $grid->findOne(["_id"=>new MongoDB\BSON\ObjectId($id)]);
        $fileExtension = explode('.',$fileDB->filename);
        $fileExtension = $fileExtension[count($fileExtension)-1];  
        $output = fopen("file.".$fileExtension,"wr");
        $stream = $bucket->openDownloadStreamByName($fileDB->filename);
        $contents = stream_get_contents($stream);
        Storage::put('file.'.$fileExtension, $contents, 'public');
        $path = storage_path('app/file.'.$fileExtension);
        return response()->download($path);
}
    
    public function downloadPdfById($id){
        $db = (new MongoDB\Client)->archivos;
        $bucket = $db->selectGridFSBucket([
            'bucketName' => 'pdf',
            'readPreference' => new MongoDB\Driver\ReadPreference(MongoDB\Driver\ReadPreference::RP_SECONDARY)
        ]);
        $grid = $bucket->getFilesCollection();
        $fileDB = $grid->findOne(["_id"=>new MongoDB\BSON\ObjectId($id)]);
        $fileExtension = explode('.',$fileDB->filename);
        $fileExtension = $fileExtension[count($fileExtension)-1];  
        $output = fopen("file.".$fileExtension,"wr");
        $stream = $bucket->openDownloadStreamByName($fileDB->filename);
        $contents = stream_get_contents($stream);
        Storage::put('file.'.$fileExtension, $contents, 'public');
        $path = storage_path('app/file.'.$fileExtension);
        return response()->download($path);
    }

    public function downloadCodigoById($id){
        $db = (new MongoDB\Client)->archivos;
        $bucket = $db->selectGridFSBucket([
            'bucketName' => 'codigo',
            'readPreference' => new MongoDB\Driver\ReadPreference(MongoDB\Driver\ReadPreference::RP_SECONDARY)
        ]);
        $grid = $bucket->getFilesCollection();
        $fileDB = $grid->findOne(["_id"=>new MongoDB\BSON\ObjectId($id)]);
        $fileExtension = explode('.',$fileDB->filename);
        $fileExtension = $fileExtension[count($fileExtension)-1];  
        $output = fopen("file.".$fileExtension,"wr");
        $stream = $bucket->openDownloadStreamByName($fileDB->filename);
        $contents = stream_get_contents($stream);
        Storage::put('file.'.$fileExtension, $contents, 'public');
        $path = storage_path('app/file.'.$fileExtension);
        return response()->download($path);
    }
    
    public function index(){
       $proyectos = Proyecto::all();
       foreach($proyectos as $proyecto) {
           $profesor = Profesor::find($proyecto->id_profesor);
           $alumno = Alumno::find($proyecto->id_alumno);
           $curso = CursosEscolares::find($alumno->id_curso_escolar);
           $proyecto->id_curso_escolar = $curso->id;
           $proyecto->nombre_alumno = $alumno->nombre;
           $proyecto->apellidos_alumno = $alumno->apellidos;
           $proyecto->nombre_curso_escolar = $curso->nombre;
           $proyecto->temporada_curso_escolar = $curso->temporada;
           $proyecto->nombre_profesor = $profesor->nombre;
           $proyecto->apellidos_profesor = $profesor->apellidos;       }
       return response()->json([
            "data"=>$proyectos,
            "ok"=>true
        ]);
    }
        
    public function store(Request $request){ 

        $ok = true;
        $msg = '';
            try{
                DB::beginTransaction();
                $request->validate([
                    'titulo' => 'required|string',
                    'descripcion' => 'required|string',
                    'id_profesor' => 'required|integer',
                    'id_alumno' => 'required|integer',
                    'pdf'=>'mimes:pdf',
                    'codigo'=>'mimes:rar,zip',
                    'presentacion'=>'mimes:pdf,ppt,pptx,doc,docx,odt',
            ]);

            //CHECK RESTRICCIÓN EXISTENCIA
            if(Profesor::find($request->id_profesor) && Alumno::find($request->id_alumno)){
            //CHECK SI NO EXISTE OTRO PROYECTO CON EL MISMO ID_ALUMNO
            if(count(DB::table('proyectos')->where('id_alumno', '=',$request->id_alumno)->get()) == 0){
                    $proyecto = new Proyecto;
                    $proyecto->titulo =  trim($request->titulo);
                    $proyecto->descripcion =  trim($request->descripcion);
                    $proyecto->id_profesor = $request->id_profesor;
                    $proyecto->id_alumno = $request->id_alumno;
                } else {
                    $ok=false;
                    $msg='EL ALUMNO INTRODUCIDO YA DDTIENE UN PROYECTO ASIGNADO';
                } 
            } else {
                $ok=false;
                $msg='ALUMNO/PROFESOR NO ENCONTRADO/S';
            }
            if(!$ok) {
                return response()->json([
                    "ok"=>$ok,
                    "msg"=>$msg
                ]);
            }
            $request->pdf ? $proyecto->pdf = $this->uploadWithGridFS($request->pdf,'pdf') : $proyecto->pdf = null ;
            $request->codigo ? $proyecto->codigo = $this->uploadWithGridFS($request->codigo,'codigo') : $proyecto->codigo = null ;
            $request->presentacion ? $proyecto->presentacion = $this->uploadWithGridFS($request->presentacion,'presentacion') : $proyecto->presentacion = null ;
            
            $proyecto->save();
            DB::commit();
            return response()->json([
                "data"=>$proyecto,
                "ok"=>true
            ]);
        }catch(\Exception $ex){
            DB::rollBack();
            return response()->json([
                "ok"=>false,
                "msg"=>$ex->getMessage()
            ]);
        }
        
    }

    public function update(Request $request) {
        $ok = true;
        $msg = '';
            try{
                DB::beginTransaction();
                $request->validate([
                    'id'=> 'required',
                    'titulo' => 'required|string',
                    'descripcion' => 'required|string',
                    'id_profesor' => 'required|integer',
                    'id_alumno' => 'required|integer',
                    'pdf'=>'mimes:pdf',
                    'codigo'=>'mimes:rar,zip',
                    'presentacion'=>'mimes:pdf,ppt,pptx,doc,docx,odt',
            ]);
               
            //CHECK EXIST
            $proyecto = Proyecto::find($request->id);
            if($proyecto){
            //CHECK SI NO EXISTE OTRO PROYECTO CON EL MISMO ID_ALUMNO
            $result = DB::table('proyectos')->where('id_alumno', '=',$request->id_alumno)->get();
                //SI NO EXISTE OTRO PROYECTO CON EL MISMO ID_ALUMNO O SI EXISTE 1 Y ES EL MISMO QUE SE DESEA MODIFICAR
                if(count($result) == 0 || $result[0]->id = $request->id){
                    $proyecto->titulo = trim($request->titulo);
                    $proyecto->descripcion =  trim($request->descripcion);
                    $proyecto->id_profesor = $request->id_profesor;
                    $proyecto->id_alumno =$request->id_alumno;
                } else {
                    $ok=false;
                    $msg='EL ALUMNO INTRODUCIDO YA TIENE UN PROYECTO ASIGNADO';
                } 
            }else {
                    $ok = false;
                    $msg = 'NO SE HAN ENCONTRADO NINGUN PROYECTO A MODIFICAR';
                }
            if(!$ok) {
                DB::rollBack();
                return response()->json([
                    "ok"=>$ok,
                    "msg"=>$msg
                ]);
            }
            if($request->codigo) {
                if($proyecto->codigo){
                    $this->deleteWithGridFS($proyecto->codigo,'codigo');
                }
                $proyecto->codigo = $this->uploadWithGridFS($request->codigo,'codigo');
            }

            if($request->presentacion) {
                if($proyecto->presentacion){
                    $this->deleteWithGridFS($proyecto->presentacion,'presentacion');
                }
                $proyecto->presentacion = $this->uploadWithGridFS($request->presentacion,'presentacion');
            }
            if($request->pdf) {
                if($proyecto->presentacion){
                    $this->deleteWithGridFS($proyecto->pdf,'pdf');
                }
                $proyecto->pdf = $this->uploadWithGridFS($request->pdf,'pdf');
            }
            
            $proyecto->save();
            DB::commit();
            return response()->json([
                "data"=>$proyecto,
                "ok"=>true
            ]);  
        }catch(\Exception $ex){
            DB::rollBack();
            return response()->json([
                "msg" => $ex->getMessage(),
                "ok"=>false
            ]);  
        }
    }

    public function destroy($id){
        try{
            DB::beginTransaction();
            $proyecto = Proyecto::findOrFail($id);
            $proyecto->codigo ? $this->deleteWithGridFS($proyecto->codigo,'codigo') : '';
            $proyecto->presentacion  ? $this->deleteWithGridFS($proyecto->presentacion,'presentacion') : '';
            $proyecto->pdf ? $this->deleteWithGridFS($proyecto->pdf,'pdf') : '';
            $proyecto->delete();
            DB::commit();
            return response()->json([
                "ok"=>true,
                "data"=>$proyecto
             ]);
        }catch(\Exception $ex){
            DB::rollBack();
            return response()->json([
                "msg" => $ex->getMessage(),
                "ok"=>false
            ]);  
        }
    }
     
    public function uploadWithGridFS($file,$bucketName) {
            $db = (new MongoDB\Client)->archivos;
            $bucket = $db->selectGridFSBucket([
                'bucketName' => $bucketName,
                'readPreference' => new MongoDB\Driver\ReadPreference(MongoDB\Driver\ReadPreference::RP_SECONDARY)
            ]);
            $resource = fopen($file, "a+");
            $nombreFichero = $file->getClientOriginalName();
            return $bucket->uploadFromStream($nombreFichero, $resource); //DEVUELVE EL ID ASIGNADO AUTOMATICAMENTE POR MONGODB
        }
        
        public function deleteWithGridFS($id,$bucketName) {
            $db = (new MongoDB\Client)->archivos;
            $bucket = $db->selectGridFSBucket([
                'bucketName' => $bucketName,
                'readPreference' => new MongoDB\Driver\ReadPreference(MongoDB\Driver\ReadPreference::RP_SECONDARY),
            ]);

            return $bucket->delete(new MongoDB\BSON\ObjectId($id)); //BOOLEAN
        } 
    
}
