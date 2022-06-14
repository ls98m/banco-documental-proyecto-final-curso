<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\ProfesorController;
use App\Http\Controllers\CursosEscolaresController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', 'App\Http\Controllers\UserController@login');
Route::post('register', 'App\Http\Controllers\UserController@register');

//se le pasara el email
Route::post('sendEmailChangePass', 'App\Http\Controllers\UserController@sendEmailChangePassword');
Route::post('updatePass', 'App\Http\Controllers\UserController@updatePassword');
Route::post('getEmailByToken', 'App\Http\Controllers\UserController@getEmailByToken');

Route::group(['middleware' => 'auth:api'], function(){

Route::get('logout', 'App\Http\Controllers\UserController@logout');
Route::get('details', 'App\Http\Controllers\UserController@details');

//ROUTES API ALUMNOS
Route::get('/gestion/alumnos', 'App\Http\Controllers\AlumnoController@index');
Route::post('/gestion/alumnos', 'App\Http\Controllers\AlumnoController@store');
Route::put('/gestion/alumnos/{id}', 'App\Http\Controllers\AlumnoController@update');
Route::delete('gestion/alumnos/{id}', [AlumnoController::class,'destroy']);

//ROUTES API PROFESORES
Route::get('/gestion/profesores', 'App\Http\Controllers\ProfesorController@index');
Route::post('/gestion/profesores', 'App\Http\Controllers\ProfesorController@store');
Route::put('/gestion/profesores/{id}', 'App\Http\Controllers\ProfesorController@update');
Route::delete('gestion/profesores/{id}', [ProfesorController::class,'destroy']);

//ROUTES API CURSOS ESCOLARES
Route::get('/gestion/cursosescolares', 'App\Http\Controllers\CursosEscolaresController@index');
Route::post('/gestion/cursosescolares', 'App\Http\Controllers\CursosEscolaresController@store');
Route::put('/gestion/cursosescolares/{id}', 'App\Http\Controllers\CursosEscolaresController@update');
Route::delete('gestion/cursosescolares/{id}', [CursosEscolaresController::class,'destroy']);

//ROUTES API PROYECTOS
Route::get('/gestion/proyectos/pdf/{id}', 'App\Http\Controllers\ProyectoController@downloadPdfById');
Route::get('/gestion/proyectos/codigo/{id}', 'App\Http\Controllers\ProyectoController@downloadCodigoById');
Route::get('/gestion/proyectos/presentacion/{id}', 'App\Http\Controllers\ProyectoController@downloadPresentacionById');

Route::get('/gestion/proyectos', 'App\Http\Controllers\ProyectoController@index');
Route::post('/gestion/proyectos', 'App\Http\Controllers\ProyectoController@store');
Route::delete('/gestion/proyectos/{id}',  'App\Http\Controllers\ProyectoController@destroy');

});

Route::post('/gestion/proyectos/edit', 'App\Http\Controllers\ProyectoController@update');
