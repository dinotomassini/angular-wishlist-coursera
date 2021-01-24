import { forwardRef, Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
//import { Subject, BehaviorSubject } from "rxjs";

import { AppConfig, AppState, APP_CONFIG, db } from "../app.module";
import { DestinoViaje } from "./destino-viaje.model";
import { ElegidoFavoritoAction, NuevoDestinoAction } from "./destinos-viajes-state.model";

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViaje[] = [];
  // current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef( () => APP_CONFIG )) private config: AppConfig,
    private http: HttpClient
  ) {
    this.store.select( state => state.destinos )
      .subscribe( data => {
        console.log('destinos sub store');
        console.log(data);
        this.destinos = data.items;
    });
    this.store.subscribe( data => {
      console.log('all store');
      console.log(data);
    });
  }

  add(destino: DestinoViaje) {
    // this.destinos.push(destino);
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest(
      'POST',
      `${this.config.apiEndpoint}/my`,
      { nuevo: destino.lugar },
      { headers: headers}
    );
    this.http.request(req).subscribe( (data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(destino));
        const myDb = db;
        myDb.destinos.add(destino);
        console.log('todos los destinos de la base de datos');
        myDb.destinos.toArray().then( destinos => console.log(destinos) );
      }
    });
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  getById(id: string): DestinoViaje {
    return this.destinos.filter( (destino) => destino.id.toString() == id)[0];
  }

  elegir(destino: DestinoViaje) {
    // this.destinos.forEach( destino => destino.setSelected(false) );
    // destino.setSelected(true);
    // this.current.next(destino);
    this.store.dispatch(new ElegidoFavoritoAction(destino));
  }

  //suscribeOnChange(fn) {
  //  this.current.subscribe(fn);
  //}
}
