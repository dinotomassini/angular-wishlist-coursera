import { Subject, BehaviorSubject } from "rxjs";
// import { Store } from "@ngrx/store";
import { DestinoViaje } from "./destino-viaje.model";
import { ElegidoFavoritoAction, NuevoDestinoAction } from "./destino-viajes-state.model";

export class DestinosApiClient {
  destinos: DestinoViaje[];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor() {
    this.destinos = [];
  }

  add(destino: DestinoViaje) {
    this.destinos.push(destino);
    // this.store.dispatch(new NuevoDestinoAction(destino));
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  getById(id: string): DestinoViaje {
    return this.destinos.filter( (destino) => destino.id.toString() == id)[0];
  }

  elegir(destino: DestinoViaje) {
    this.destinos.forEach( destino => destino.setSelected(false) );
    destino.setSelected(true);
    this.current.next(destino);
    // this.store.dispatch(new ElegidoFavoritoAction(destino));
  }

  //suscribeOnChange(fn) {
  //  this.current.subscribe(fn);
  //}
}
