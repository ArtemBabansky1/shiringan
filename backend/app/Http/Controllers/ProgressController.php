<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProgressController extends Controller
{
    public function index(Request $request)
    {
        $rows = Progress::where('user_id', $request->user()->id)
            ->where('done', true)
            ->get(['day_idx', 'task_key']);

        $completed = [];
        foreach ($rows as $row) {
            $completed[$row->day_idx][$row->task_key] = true;
        }

        return response()->json(['completed' => $completed]);
    }

    public function toggle(Request $request)
    {
        $data = $request->validate([
            'dayIdx'  => 'required|integer|min:0',
            'taskKey' => 'required|string',
            'done'    => 'required|boolean',
        ]);

        $uid = $request->user()->id;

        if ($data['done']) {
            Progress::updateOrCreate(
                ['user_id' => $uid, 'day_idx' => $data['dayIdx'], 'task_key' => $data['taskKey']],
                ['done' => true]
            );
        } else {
            Progress::where([
                'user_id'  => $uid,
                'day_idx'  => $data['dayIdx'],
                'task_key' => $data['taskKey'],
            ])->delete();
        }

        return response()->json(['ok' => true]);
    }

    public function bulk(Request $request)
    {
        $data = $request->validate([
            'completed' => 'required|array',
        ]);

        $uid = $request->user()->id;

        DB::transaction(function () use ($uid, $data) {
            Progress::where('user_id', $uid)->delete();

            $rows = [];
            foreach ($data['completed'] as $dayIdx => $tasks) {
                foreach ($tasks as $taskKey => $done) {
                    if ($done) {
                        $rows[] = ['user_id' => $uid, 'day_idx' => (int)$dayIdx, 'task_key' => $taskKey, 'done' => true];
                    }
                }
            }

            if (!empty($rows)) {
                Progress::insert($rows);
            }
        });

        return response()->json(['ok' => true]);
    }

    public function reset(Request $request)
    {
        Progress::where('user_id', $request->user()->id)->delete();

        return response()->json(['ok' => true]);
    }
}
