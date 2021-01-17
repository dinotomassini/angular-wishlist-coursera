import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { ElegidoFavoritoAction, NuevoDestinoAction } from "../manageState/actions";
import { DestinoViaje } from "../models/destino-viaje.model";
import { DestinosApiClient } from "./../models/destinos-api-client-model";

@Component({
  selector: "app-lista-destinos",
  templateUrl: "./lista-destinos.component.html",
  styleUrls: ["./lista-destinos.component.css"],
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  //destinos: DestinoViaje[];

  constructor(public destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    // this.destinosApiClient.suscribeOnChange( (destino: DestinoViaje) => {
    //   if (destino != null) {
    //     this.updates.push('Se ha elegido a ' + destino.lugar);
    //   }
    // });
  }

  ngOnInit(): void {
    this.store.select( state => state.destinos.favorito )
      .subscribe( data => {
        const fav = data;
        if (fav != null) {
          this.updates.push('Se ha elegido a ' + fav.lugar)
        }
      });
  }

  // guardar(lugar: string, urlImage: string) {
  //   const newDestino = new DestinoViaje("lugar", "urlImage");
  //   this.destinos.push(newDestino);
  //   return false;
  // }

  agregado(destino: DestinoViaje) {
    this.destinosApiClient.add(destino);
    this.onItemAdded.emit(destino);
    this.store.dispatch(new NuevoDestinoAction(destino));
  }

  elegido(destino: DestinoViaje) {
    // PRIMER METODO
    // this.destinos.forEach((destino) => {
    //   destino.setSelected(false);
    // });
    // destino.setSelected(true);
    
    // SEGUNDO METODO
    // this.destinosApiClient.getAll().forEach((destino) => {
    //   destino.setSelected(false);
    // });
    // destino.setSelected(true);

    // TERCER METODO
    this.destinosApiClient.elegir(destino);
    this.store.dispatch(new ElegidoFavoritoAction(destino));
  }
}
