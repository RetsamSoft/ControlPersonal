import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlPersonalService } from '../services/control-personal.service';
import { Empleado, Registro } from '../models/registro.model';

@Component({
  selector: 'app-marcacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="marcacion-container">
      <div class="header">
        <h2>Control de Personal</h2>
        <div class="reloj">
          <div class="fecha">{{ fechaActual() }}</div>
          <div class="hora">{{ horaActual() }}</div>
        </div>
      </div>

      <div class="formulario-marcacion">
        <div class="input-group">
          <label for="numeroEmpleado">Número de Empleado:</label>
          <input 
            id="numeroEmpleado"
            type="text" 
            [(ngModel)]="numeroEmpleado" 
            placeholder="Ingrese su número de empleado"
            (keyup.enter)="marcarAsistencia()"
            class="input-empleado">
        </div>

        <button 
          (click)="marcarAsistencia()" 
          [disabled]="!numeroEmpleado().trim()"
          class="btn-marcar">
          Marcar Asistencia
        </button>
      </div>

      @if (mensaje()) {
        <div class="mensaje" [ngClass]="tipoMensaje()">
          {{ mensaje() }}
        </div>
      }

      @if (empleadoSeleccionado()) {
        <div class="info-empleado">
          <h3>Empleado: {{ empleadoSeleccionado()?.nombre }} {{ empleadoSeleccionado()?.apellido }}</h3>
          <p>Número: {{ empleadoSeleccionado()?.numeroEmpleado }}</p>
          <p>Próxima marcación: <strong>{{ siguienteTipo() }}</strong></p>
        </div>
      }
    </div>
  `,
  styles: [`
    .marcacion-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .header h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .reloj {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      border: 2px solid #e9ecef;
    }

    .fecha {
      font-size: 1.1rem;
      color: #6c757d;
      margin-bottom: 0.5rem;
    }

    .hora {
      font-size: 2rem;
      font-weight: bold;
      color: #2c3e50;
      font-family: 'Courier New', monospace;
    }

    .formulario-marcacion {
      margin-bottom: 2rem;
    }

    .input-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #495057;
    }

    .input-empleado {
      width: 100%;
      padding: 12px;
      border: 2px solid #ced4da;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .input-empleado:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .btn-marcar {
      width: 100%;
      padding: 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1.1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .btn-marcar:hover:not(:disabled) {
      background: #0056b3;
    }

    .btn-marcar:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }

    .mensaje {
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: 500;
    }

    .mensaje.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .mensaje.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .info-empleado {
      background: #e7f3ff;
      padding: 1rem;
      border-radius: 6px;
      border-left: 4px solid #007bff;
    }

    .info-empleado h3 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    .info-empleado p {
      margin: 0.25rem 0;
      color: #495057;
    }
  `]
})
export class MarcacionComponent {
  private controlService = inject(ControlPersonalService);
  
  numeroEmpleado = signal('');
  mensaje = signal('');
  tipoMensaje = signal<'success' | 'error'>('success');
  empleadoSeleccionado = signal<Empleado | null>(null);
  siguienteTipo = signal<'entrada' | 'salida'>('entrada');
  fechaActual = signal('');
  horaActual = signal('');

  constructor() {
    this.actualizarReloj();
    setInterval(() => this.actualizarReloj(), 1000);
  }

  private actualizarReloj() {
    const ahora = new Date();
    this.fechaActual.set(ahora.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
    this.horaActual.set(ahora.toLocaleTimeString('es-ES'));
  }

  marcarAsistencia() {
    const numero = this.numeroEmpleado().trim();
    
    if (!numero) {
      this.mostrarMensaje('Por favor ingrese un número de empleado', 'error');
      return;
    }

    const empleado = this.controlService.buscarEmpleadoPorNumero(numero);
    
    if (!empleado) {
      this.mostrarMensaje('Empleado no encontrado o inactivo', 'error');
      this.empleadoSeleccionado.set(null);
      return;
    }

    const tipoMarcacion = this.controlService.obtenerSiguientoTipo(empleado.id);
    const registro = this.controlService.registrarMarcacion(empleado, tipoMarcacion);
    
    this.empleadoSeleccionado.set(empleado);
    this.siguienteTipo.set(this.controlService.obtenerSiguientoTipo(empleado.id));
    
    const hora = registro.fechaHora.toLocaleTimeString('es-ES');
    this.mostrarMensaje(
      `${tipoMarcacion.toUpperCase()} registrada exitosamente a las ${hora}`, 
      'success'
    );
    
    this.numeroEmpleado.set('');
  }

  private mostrarMensaje(texto: string, tipo: 'success' | 'error') {
    this.mensaje.set(texto);
    this.tipoMensaje.set(tipo);
    
    setTimeout(() => {
      this.mensaje.set('');
    }, 4000);
  }
}
