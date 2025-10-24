<?php

namespace Database\Seeders;   // ← WAJIB persis begini

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder   // ← Nama class HARUS sama dengan nama file (UserSeeder)
{
    public function run(): void
    {
        // Akun admin
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Site Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        // Akun user biasa (opsional)
        User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Normal User',
                'password' => Hash::make('password123'),
                'role' => 'user',
            ]
        );
    }
}
