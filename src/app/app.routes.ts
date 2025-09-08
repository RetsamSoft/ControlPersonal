import { Routes } from '@angular/router';
import { MarcacionComponent } from './components/marcacion.component';
import { HistorialComponent } from './components/historial.component';

export const routes: Routes = [
  { path: '', redirectTo: '/marcacion', pathMatch: 'full' },
  { path: 'marcacion', component: MarcacionComponent },
  { path: 'historial', component: HistorialComponent },
  { path: '**', redirectTo: '/marcacion' }
];
