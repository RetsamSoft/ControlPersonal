import { Injectable, signal } from '@angular/core';
import { Empleado, Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class ControlPersonalService {
  private empleados = signal<Empleado[]>([
    {
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      numeroEmpleado: '001',
      activo: true
    },
    {
      id: '2',
      nombre: 'María',
      apellido: 'García',
      numeroEmpleado: '002',
      activo: true
    },
    {
      id: '3',
      nombre: 'Carlos',
      apellido: 'López',
      numeroEmpleado: '003',
      activo: true
    }
  ]);

  private registros = signal<Registro[]>([]);

  getEmpleados() {
    return this.empleados.asReadonly();
  }

  getRegistros() {
    return this.registros.asReadonly();
  }

  buscarEmpleadoPorNumero(numeroEmpleado: string): Empleado | undefined {
    return this.empleados().find(emp => emp.numeroEmpleado === numeroEmpleado && emp.activo);
  }

  registrarMarcacion(empleado: Empleado, tipo: 'entrada' | 'salida'): Registro {
    const nuevoRegistro: Registro = {
      id: this.generarId(),
      empleadoId: empleado.id,
      empleadoNombre: `${empleado.nombre} ${empleado.apellido}`,
      fechaHora: new Date(),
      tipo: tipo
    };

    this.registros.update(registros => [nuevoRegistro, ...registros]);
    return nuevoRegistro;
  }

  getUltimaMarcacion(empleadoId: string): Registro | undefined {
    return this.registros().find(registro => registro.empleadoId === empleadoId);
  }

  obtenerSiguientoTipo(empleadoId: string): 'entrada' | 'salida' {
    const ultimaMarcacion = this.getUltimaMarcacion(empleadoId);
    
    if (!ultimaMarcacion) {
      return 'entrada';
    }
    
    return ultimaMarcacion.tipo === 'entrada' ? 'salida' : 'entrada';
  }

  private generarId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
