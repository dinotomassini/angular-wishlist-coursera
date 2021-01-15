import { DestinoViaje } from "./destino-viaje.model";

export class DestinosApiClient {
  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }

  add(destino: DestinoViaje) {
    this.destinos.push(destino);
  }

  getAll() {
    return this.destinos;
  }
}
