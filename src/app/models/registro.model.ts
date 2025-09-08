export interface Registro {
  id: string;
  empleadoId: string;
  empleadoNombre: string;
  fechaHora: Date;
  tipo: 'entrada' | 'salida';
}

export interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  numeroEmpleado: string;
  activo: boolean;
}
