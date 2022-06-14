<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysql')->create('proyectos', function(Blueprint $table){
            $table->engine = 'InnoDB';	
            $table->bigIncrements('id');
           $table->bigInteger('id_alumno')->unsigned();
           $table->unique('id_alumno');
            $table->bigInteger('id_profesor')->unsigned();
            $table->string('titulo');
            $table->string('descripcion');
            $table->string('pdf')->nullable();
            $table->string('presentacion')->nullable();
            $table->string('codigo')->nullable();
            $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('updated_at')->nullable();
            $table->foreign('id_alumno')->references('id')->on('alumnos');
            $table->foreign('id_profesor')->references('id')->on('profesores');
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
