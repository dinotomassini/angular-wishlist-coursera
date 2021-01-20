import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client-model';

@Component({
  selector: 'app-destino-detalle-component',
  templateUrl: './destino-detalle-component.component.html',
  styleUrls: ['./destino-detalle-component.component.css']
})
export class DestinoDetalleComponentComponent implements OnInit {
  destino: DestinoViaje;

  constructor(
    private route: ActivatedRoute,
    private destinosApiClient: DestinosApiClient
  ) { }

  ngOnInit(): void {
    this.destino = null;
  }

}
