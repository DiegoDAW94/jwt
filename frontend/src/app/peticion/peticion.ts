export interface Peticion {
  id?: number;
  titulo: string;
  descripcion: string;
  destinatario: string;
  categoria_id?: number;
  firmantes?: number;
  estado?: string;
  categoria?: {
    nombre: string;
  };
  user?: {
    name: string;
  };
  user_id?: number; // Añadir esta propiedad
}