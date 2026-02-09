<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Supprimer l'ancienne colonne si elle existe
            if (Schema::hasColumn('users', 'status')) {
                $table->dropColumn('status');
            }

            // Recréer avec enum actif/inactif et valeur par défaut
            $table->enum('status', ['actif', 'inactif'])->default('actif')->after('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
