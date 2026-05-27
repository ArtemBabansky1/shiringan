<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $profile = $request->user()->profile;

        return response()->json([
            'totalDays' => $profile->total_days,
            'startDate' => $profile->start_date,
            'taskDefs'  => json_decode($profile->task_defs,  true) ?: (object)[],
            'taskGains' => json_decode($profile->task_gains, true) ?: (object)[],
            'weekSched' => json_decode($profile->week_sched, true) ?: (object)[],
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'totalDays' => 'sometimes|integer|min:7|max:365',
            'startDate' => 'sometimes|date_format:Y-m-d',
            'taskDefs'  => 'sometimes|array',
            'taskGains' => 'sometimes|array',
            'weekSched' => 'sometimes|array',
        ]);

        $profile = $request->user()->profile;

        if (isset($data['totalDays'])) $profile->total_days = $data['totalDays'];
        if (isset($data['startDate'])) $profile->start_date = $data['startDate'];
        if (isset($data['taskDefs']))  $profile->task_defs  = json_encode($data['taskDefs']);
        if (isset($data['taskGains'])) $profile->task_gains = json_encode($data['taskGains']);
        if (isset($data['weekSched'])) $profile->week_sched = json_encode($data['weekSched']);

        $profile->save();

        return $this->show($request);
    }
}
