<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    public $timestamps = false;

    protected $fillable = ['user_id', 'total_days', 'start_date', 'task_defs', 'task_gains', 'week_sched'];

    protected $attributes = [
        'total_days' => 100,
        'task_defs'  => '{}',
        'task_gains' => '{}',
        'week_sched' => '{}',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
