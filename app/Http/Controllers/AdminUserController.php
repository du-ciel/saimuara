<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    /**
     * Ensure only admin_provinsi can access these methods.
     */
    public function __construct()
    {
        // Check in methods directly to handle Inertia responses properly if needed
    }

    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin_provinsi') {
            abort(403, 'Unauthorized action.');
        }

        $admins = User::where('role', 'admin_kabupaten')->get();

        return Inertia::render('admin/users/index', [
            'adminUsers' => $admins
        ]);
    }

    public function update(Request $request, User $user)
    {
        if ($request->user()->role !== 'admin_provinsi') {
            abort(403, 'Unauthorized action.');
        }

        if ($user->role !== 'admin_kabupaten') {
            abort(403, 'Hanya admin kabupaten yang dapat diubah melalui menu ini.');
        }

        $validated = $request->validate([
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'kabupaten' => ['required', 'string', 'max:255'],
        ]);

        $user->update([
            'email' => $validated['email'],
            'kabupaten' => $validated['kabupaten'],
            // update name as well to reflect kabupaten change
            'name' => 'Admin ' . $validated['kabupaten'],
        ]);

        return redirect()->back();
    }

    public function updatePassword(Request $request, User $user)
    {
        if ($request->user()->role !== 'admin_provinsi') {
            abort(403, 'Unauthorized action.');
        }

        if ($user->role !== 'admin_kabupaten') {
            abort(403, 'Hanya admin kabupaten yang dapat diubah melalui menu ini.');
        }

        $validated = $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->back();
    }
}
