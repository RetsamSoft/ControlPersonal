import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPersonalService } from '../services/control-personal.service';
import { Registro } from '../models/registro.model';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="historial-container">
      <h2>Historial de Marcaciones</h2>
      
      @if (registros().length === 0) {
        <div class="sin-registros">
          <p>No hay registros de marcaciones aún.</p>
        </div>
      } @else {
        <div class="filtros">
          <button 
            (click)="filtroActual = 'todos'" 
            [class.activo]="filtroActual === 'todos'"
            class="btn-filtro">
            Todos
          </button>
          <button 
            (click)="filtroActual = 'entrada'" 
            [class.activo]="filtroActual === 'entrada'"
            class="btn-filtro">
            Entradas
          </button>
          <button 
            (click)="filtroActual = 'salida'" 
            [class.activo]="filtroActual === 'salida'"
            class="btn-filtro">
            Salidas
          </button>
        </div>

        <div class="tabla-container">
          <table class="tabla-registros">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              @for (registro of registrosFiltrados; track registro.id) {
                <tr>
                  <td>{{ registro.empleadoNombre }}</td>
                  <td>
                    <span class="badge" [ngClass]="registro.tipo">
                      {{ registro.tipo | titlecase }}
                    </span>
                  </td>
                  <td>{{ formatearFecha(registro.fechaHora) }}</td>
                  <td>{{ formatearHora(registro.fechaHora) }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .historial-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 2rem;
      text-align: center;
    }

    .sin-registros {
      text-align: center;
      padding: 3rem;
      color: #6c757d;
      font-size: 1.1rem;
    }

    .filtros {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      justify-content: center;
    }

    .btn-filtro {
      padding: 8px 16px;
      border: 2px solid #dee2e6;
      background: white;
      color: #495057;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }

    .btn-filtro:hover {
      border-color: #007bff;
      color: #007bff;
    }

    .btn-filtro.activo {
      background: #007bff;
      border-color: #007bff;
      color: white;
    }

    .tabla-container {
      overflow-x: auto;
    }

    .tabla-registros {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .tabla-registros th {
      background: #f8f9fa;
      color: #495057;
      font-weight: 600;
      padding: 1rem;
      text-align: left;
      border-bottom: 2px solid #dee2e6;
    }

    .tabla-registros td {
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
      color: #495057;
    }

    .tabla-registros tr:hover {
      background: #f8f9fa;
    }

    .badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .badge.entrada {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .badge.salida {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeaa7;
    }

    @media (max-width: 600px) {
      .historial-container {
        margin: 1rem;
        padding: 1rem;
      }

      .filtros {
        flex-wrap: wrap;
      }

      .tabla-registros {
        font-size: 0.9rem;
      }

      .tabla-registros th,
      .tabla-registros td {
        padding: 0.5rem;
      }
    }
  `]
})
export class HistorialComponent {
  private controlService = inject(ControlPersonalService);
  
  registros = this.controlService.getRegistros();
  filtroActual: 'todos' | 'entrada' | 'salida' = 'todos';

  get registrosFiltrados(): Registro[] {
    if (this.filtroActual === 'todos') {
      return this.registros();
    }
    return this.registros().filter(registro => registro.tipo === this.filtroActual);
  }

  formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatearHora(fecha: Date): string {
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
