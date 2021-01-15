import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DestinoViaje } from "../models/destino-viaje.model";
import { DestinosApiClient } from "./../models/destinos-api-client-model";

@Component({
  selector: "app-lista-destinos",
  templateUrl: "./lista-destinos.component.html",
  styleUrls: ["./lista-destinos.component.css"],
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;

  //destinos: DestinoViaje[];

  constructor(public destinosApiClient: DestinosApiClient) {
    //this.destinos = [];
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {}

  // guardar(lugar: string, urlImage: string) {
  //   const newDestino = new DestinoViaje("lugar", "urlImage");
  //   this.destinos.push(newDestino);
  //   return false;
  // }

  agregado(destino: DestinoViaje) {
    this.destinosApiClient.add(destino);
    this.onItemAdded.emit(destino);
  }

  elegido(destino: DestinoViaje) {
    // this.destinos.forEach((destino) => {
    //   destino.setSelected(false);
    // });
    // destino.setSelected(true);
    this.destinosApiClient.getAll().forEach((destino) => {
      destino.setSelected(false);
    });
    destino.setSelected(true);
  }
}
