<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('peticione_user', function (Blueprint $table) {
        $table->primary(['user_id', 'peticione_id']);
        $table->bigInteger('user_id')->unsigned();
        $table->bigInteger('peticione_id')->unsigned();
        $table->timestamps();

        // Agregar onDelete('cascade') a las claves foráneas
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('peticione_id')->references('id')->on('peticiones')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.+
     */
    public function down(): void
    {
        Schema::dropIfExists('peticione_user');
    }
};
