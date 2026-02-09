<?php

// database/migrations/xxxx_xx_xx_create_quotes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();

            $table->string('full_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('city')->nullable();

            $table->string('project_type');
            $table->text('description');

            $table->string('budget')->nullable();
            $table->string('photo')->nullable(); // chemin du fichier

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
