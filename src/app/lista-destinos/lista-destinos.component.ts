import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }

  ngOnInit(): void {}


  guardar(lugar:string, urlImage:string):boolean {
    const newDestino = new DestinoViaje(lugar, urlImage);
    this.destinos.push(newDestino);
    return false;
  }

}
