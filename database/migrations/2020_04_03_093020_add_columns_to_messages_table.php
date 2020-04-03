<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->unsignedBigInteger('room_id')->after('user_id');
            $table->softDeletes();

            $table->foreign('room_id')->references('id')->on('rooms')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropForeign(['room_id']);
        });
        Schema::table('messages', function (Blueprint $table) {
            $table->dropColumn(['room_id', 'deleted_at']);
        });
    }
}
