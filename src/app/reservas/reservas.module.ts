import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ListadoReservasComponent } from './listado-reservas/listado-reservas.component';
import { ReservasDetalleComponent } from './reservas-detalle/reservas-detalle.component';
import { ReservasApiClientService } from './reservas-api-client.service';


@NgModule({
  declarations: [
    ListadoReservasComponent, 
    ReservasDetalleComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule
  ],
  providers: [
    ReservasApiClientService
  ]
})
export class ReservasModule { }
