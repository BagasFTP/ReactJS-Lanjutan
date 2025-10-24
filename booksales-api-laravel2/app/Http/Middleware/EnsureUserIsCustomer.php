<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsCustomer
{
    public function handle($request, Closure $next)
{
    $user = $request->user();
    if (!$user) {
        return response()->json(['message' => 'Unauthenticated.'], 401);
    }
    if (!in_array($user->role, ['customer', 'user'])) {
        return response()->json(['message' => 'Forbidden: customer only.'], 403);
    }
    return $next($request);
}

}
