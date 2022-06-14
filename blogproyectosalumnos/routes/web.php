<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\ProfesorController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



//RUTAS PARA ALUMNOS
//Route::get('/blogProyecto/gestion/alumnos', [AlumnoController::class, 'index']);
//Route::get('/blogProyecto/gestion/alumnos/edit/{_id}', [AlumnoController::class, 'edit']);
//Route::get('/blogProyecto/gestion/alumnos', [AlumnoController::class, 'index']);

//RUTAS PARA PROFESORES
Route::get('/getProfesores', [ProfesorController::class, 'getProfesores']);
Route::get('/blogProyecto/gestion/profesores', [ProfesorController::class, 'index']);
Route::get('/blogProyecto/gestion/profesores/edit/{_id}', [ProfesorController::class, 'edit']);

//Route::get('/gestion/alumnos/edit/{_id}', [AlumnoController::class, 'edit']);
//Route::get('/gestion/alumnos/delete/{_id}', [AlumnoController::class, 'delete']);
//Route::get('/gestion/alumnos', [AlumnoController::class, 'index']);
//Route::get('/gestion/alumnos/edit', [AlumnoController::class, 'edit']);



