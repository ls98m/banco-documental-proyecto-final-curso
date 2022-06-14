<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\Http\Controllers\MailController;
use App\Models\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\RefreshTokenRepository;
use Hash;
use DB;
use App\Mail\MailSender;
use Mail;

use Illuminate\Support\Str;

class UserController extends Controller 
{
public $successStatus = 200;
/** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user();
            $token =  $user->createToken('APP BLOG')-> accessToken; 
            return response()->json([
                'ok' => true,
                'token' => $token
            ]); 
        } else{ 
            return response()->json(['ok'=>false],401); 
        } 
    }
/** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        try {
        DB::beginTransaction();
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'email' => 'required|email|unique:users', 
            'password' => 'required', 
            'c_password' => 'required|same:password', 
        ]);
        $input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $token =  $user->createToken('APP BLOG')-> accessToken; 
        DB::commit();
        return response()->json(['ok'=>true,'token'=>$token]); 
    }catch(\QueryException $ex){
        DB::rollBack();
        if($ex->getCode() === '23000') {
            return response()->json(['ok'=>false,'msg'=>'Correo electronico en uso'],401);            
        }
        return response()->json(['ok'=>false,'msg'=>$ex->getMessage()]);            
        return response()->json(['ok'=>false,'msg'=>$ex->getMessage()], 401);            
    } catch (\Exception $ex){
        return response()->json(['ok'=>false,'msg'=>$ex->getMessage()], 401);            

    }

    }
/** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details() 
    { 
        $user = Auth::user(); 
        return response()->json(['ok' => $user], $this-> successStatus);
    } 

    public function logout(){
        if (Auth::check()) {
            Auth::user()->token()->revoke();
            return response()->json(['ok' =>true],200); 
        }else{
            return response()->json(['error' =>'api.something_went_wrong'], 500);
        }
    }

    public function getEmailByToken(Request $request) {
        $user = DB::table('password_resets')->where('token', '=',$request->token)->get();
        return response()->json([
           'data'=>$user
        ]);  
    }

    public function updatePassword(Request $request){
        try{
            DB::beginTransaction(); 
            $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required', 
            'c_password' => 'required|same:password',
        ]);
        $input = $request->all();
        DB::table('users')
        ->where('email',"=", $input['email'])
        ->update(['password' => bcrypt($input['password'])]);
        DB::table('password_resets')->where('email', '=', $input['email'])->delete();
        DB::commit();
        return response()->json([
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



    public function sendEmailChangePassword(Request $request){
      
     $request->validate([
            'email' => 'required|email|exists:users',
        ]);
    
       $token = Str::random(64);
        DB::table('password_resets')->insert([
            'email' => $request->email, 
            'token' => $token, 
          ]);

          Mail::to($request->email)->send(new MailSender($token));

          return response()->json([
            "ok"=>true,
        ]);  

    }
}