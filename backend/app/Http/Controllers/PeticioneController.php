<?php

namespace App\Http\Controllers;

use App\Models\Peticione;
use App\Models\User;
use App\Models\categoria;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PeticioneController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        try {
            $peticiones = Peticione::paginate(10); // 10 elementos por página
            return response()->json($peticiones);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function listMine()
{
    try {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $peticiones = Peticione::where('user_id', $user->id)->paginate(10); // 10 elementos por página
        return response()->json($peticiones);
    } catch (\Exception $exception) {
        return response()->json(['error' => $exception->getMessage()], 500);
    }
}

public function show($id)
{
    try {
        $peticion = Peticione::with('categoria', 'user', 'files')->findOrFail($id);
        return response()->json($peticion);
    } catch (\Exception $exception) {
        return response()->json(['error' => $exception->getMessage()], 500);
    }
}

public function listSigned()
{
    try {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }
        $peticiones = $user->firmas()->paginate(10); // 10 elementos por página
        return response()->json($peticiones);
    } catch (\Exception $exception) {
        return response()->json(['error' => $exception->getMessage()], 500);
    }
}



public function update(Request $request, $id)
{
    try {
        // Buscar la petición
        $peticion = Peticione::findOrFail($id);

        // Validar los datos de entrada
        $validatedData = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'destinatario' => 'nullable|string|max:255',
        ]);

        // Actualizar los datos básicos de la petición
        $peticion->update([
            'titulo' => $validatedData['titulo'],
            'descripcion' => $validatedData['descripcion'],
            'destinatario' => $validatedData['destinatario'],
        ]);

        // Retornar una respuesta exitosa
        return response()->json(['message' => 'Petición actualizada con éxito', 'peticion' => $peticion], 200);
    } catch (\Exception $exception) {
        // Retornar un error genérico
        return response()->json(['error' => $exception->getMessage()], 500);
    }
}

    public function store(Request $request)
{
    try {
        if ($request->user()->cannot('create', Peticione::class)) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $this->validate($request, [
            'titulo' => 'required|max:255',
            'descripcion' => 'required',
            'destinatario' => 'required',
            'categoria_id' => 'required',
            'files.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validación para imágenes
        ]);

        $input = $request->all();
        $category = Categoria::findOrFail($request->input('categoria_id'));
        $user = Auth::user();

        $peticion = new Peticione($input);
        $peticion->user()->associate($user);
        $peticion->categoria()->associate($category);
        $peticion->firmantes = 0;
        $peticion->estado = 'pendiente';
        $peticion->save();

        // Manejar la subida de archivos
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads', $fileName, 'public');
        
                $peticion->files()->create([
                    'name' => $fileName,
                    'file_path' => '/storage/' . $filePath, // Ruta pública
                ]);
            }
        }

        return response()->json($peticion->load('files'), 201);
    } catch (\Exception $exception) {
        return response()->json(['error' => $exception->getMessage()], 500);
    }
}

public function firmar(Request $request, $id)
{
    try {
        $peticion = Peticione::findOrFail($id);
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Verificar si el usuario ya firmó la petición
        if ($peticion->firmas()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'Ya has firmado esta petición'], 400);
        }

        // Registrar la firma en la tabla 'firmas'
        $peticion->firmas()->attach($user->id);

        // Incrementar el contador de firmantes en la tabla 'peticiones'
        $peticion->increment('firmantes');

        return response()->json(['message' => 'Petición firmada con éxito'], 200);
    } catch (\Exception $exception) {
        return response()->json(['error' => $exception->getMessage()], 500);
    }
}


public function cambiarEstado(Request $request, $id)
{
    try {
        $peticion = Peticione::findOrFail($id);

        // Verificar si el usuario tiene permiso para cambiar el estado
        if ($request->user()->cannot('cambiarEstado', $peticion)) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        // Alternar el estado entre 'aceptada' y 'pendiente'
        $peticion->estado = $peticion->estado === 'aceptada' ? 'pendiente' : 'aceptada';
        $peticion->save();

        return response()->json(['message' => 'Estado cambiado con éxito', 'estado' => $peticion->estado], 200);
    } catch (\Exception $exception) {
        return response()->json(['error' => $exception->getMessage()], 500);
    }
}

    public function delete(Request $request, $id)
    {
        try{
            $peticion = Peticione::findOrFail($id);
            if($request->user()->cannot('delete', $peticion)){
                return response()->json(['error'=>'No autorizado'], 403);
            }
            $peticion->delete();
            return $peticion;
        }catch (\Exception $exception){
            return response()->json(['error'=>$exception->getMessage()]);
        }
    }
}
