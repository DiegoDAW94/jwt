<?php
use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

Route::controller(\App\Http\Controllers\PeticioneController::class)->group(function () {
    Route::get('peticiones', 'index');
    Route::get('mispeticiones', 'listmine');
    Route::get('peticiones/{id}', 'show');
    Route::delete('peticiones/{id}', 'delete')->middleware('auth:api'); // Proteger con JWT
    Route::put('peticiones/firmar/{id}', 'firmar')->middleware('auth:api'); // Proteger con JWT
    Route::put('peticiones/{id}', 'update')->middleware('auth:api'); // Proteger con JWT
    Route::put('peticiones/estado/{id}', 'cambiarEstado')->middleware('auth:api'); // Proteger con JWT
    Route::post('peticiones', 'store')->middleware('auth:api'); // Proteger con JWT
    Route::get('misfirmas', 'listSigned')->middleware('auth:api'); // Ruta para peticiones firmadas
});

Route::controller(\App\Http\Controllers\AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout')->middleware('auth:api'); // Proteger con JWT
    Route::post('refresh', 'refresh')->middleware('auth:api'); // Proteger con JWT
    Route::get('me', 'me')->middleware('auth:api'); // Proteger con JWT
});


Route::post('test-update', function (Request $request) {
    return response()->json([
        'received_data' => $request->all(),
        'received_files' => $request->file('files'),
    ], 200);
});