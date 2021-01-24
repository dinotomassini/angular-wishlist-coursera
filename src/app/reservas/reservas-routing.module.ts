import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoReservasComponent,  } from './listado-reservas/listado-reservas.component';
import { ReservasDetalleComponent } from './reservas-detalle/reservas-detalle.component';

const routes: Routes = [
  { path: 'reservas', component: ListadoReservasComponent },
  { path: 'reservas/:id', component: ReservasDetalleComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReservasRoutingModule { }
