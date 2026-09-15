<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Input Data (Khusus Admin Kabupaten)
    Route::get('/input', [App\Http\Controllers\InputController::class, 'index'])->name('input.index');
    Route::post('/input/pokdakan', [App\Http\Controllers\InputController::class, 'storePokdakan'])->name('input.storePokdakan');
    Route::post('/input/mesin', [App\Http\Controllers\InputController::class, 'storeLaporanMesin'])->name('input.storeMesin');
    Route::post('/input/ras', [App\Http\Controllers\InputController::class, 'storeLaporanRas'])->name('input.storeRas');

    // Admin Management (Khusus Admin Provinsi)
    Route::get('/admin/users', [App\Http\Controllers\AdminUserController::class, 'index'])->name('admin.users.index');
    Route::put('/admin/users/{user}', [App\Http\Controllers\AdminUserController::class, 'update'])->name('admin.users.update');
    Route::put('/admin/users/{user}/password', [App\Http\Controllers\AdminUserController::class, 'updatePassword'])->name('admin.users.password');
});

require __DIR__.'/settings.php';
