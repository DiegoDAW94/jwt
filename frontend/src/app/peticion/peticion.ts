export interface Categoria {
  id: number;
  nombre: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

export interface File {
  id: number;
  name: string;
  file_path: string;
}

export interface Peticion {
  categoria_id: any;
  id?: number;
  titulo?: string;
  descripcion?: string;
  destinatario?: string;
  categoria?: Categoria; // Relación con la categoría
  user?: User; // Relación con el usuario
  firmantes?: number;
  estado?: string;
  files?: File[]; // Relación con los archivos
  user_id?: number; // ID del usuario creador
}