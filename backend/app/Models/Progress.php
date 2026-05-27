<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    public $timestamps = false;

    protected $fillable = ['user_id', 'day_idx', 'task_key', 'done'];

    protected $casts = ['done' => 'boolean'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
