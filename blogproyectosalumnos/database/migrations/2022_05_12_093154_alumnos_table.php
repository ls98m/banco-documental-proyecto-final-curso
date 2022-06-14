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
        Schema::connection('mysql')->create('alumnos', function(Blueprint $table){
            $table->engine = 'InnoDB';	
            $table->bigIncrements('id');
            $table->bigInteger('id_curso_escolar')->unsigned();
            $table->string('nombre');
            $table->string('apellidos');
            $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('updated_at')->nullable();
            $table->foreign('id_curso_escolar')->references('id')->on('cursos_escolares');
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
