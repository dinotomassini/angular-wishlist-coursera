import { Subject, BehaviorSubject } from "rxjs";
import { DestinoViaje } from "./destino-viaje.model";

export class DestinosApiClient {
  destinos: DestinoViaje[];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor() {
    this.destinos = [];
  }

  add(destino: DestinoViaje) {
    this.destinos.push(destino);
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  // getById(id: string): DestinoViaje {
  //   return this.destinos.filter( (destino) => destino.id.toString() == id)[0];
  // }

  elegir(destino: DestinoViaje) {
    this.destinos.forEach( destino => destino.setSelected(false) );
    destino.setSelected(true);
    this.current.next(destino);
  }

  suscribeOnChange(fn) {
    this.current.subscribe(fn);
  }
}
