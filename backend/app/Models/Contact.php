<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:d M Y, H:i',
        'updated_at' => 'datetime:d M Y, H:i',
    ];
}
