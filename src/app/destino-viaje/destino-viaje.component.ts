import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';


@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: DestinoViaje;
  // IMPORTANTE LEER
  // NO UTILIZO EL HOSTBINDING PORQUE LO RESOLVI DE OTRA FORMA, A MI ENTENDER MAS FACILE
  // IGUAL LO DEJO AGREGADO PARA IR SIGUIENDO PASO A PASO Y
  // POR SI EN EL TRABAJO ES NECESARIO QUE ESTE
  @HostBinding('attr.class') cssClass = 'mb-3';

  constructor() {
  }

  ngOnInit(): void {
  }

}
