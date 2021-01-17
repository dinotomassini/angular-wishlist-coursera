import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DestinosViajesActionTypes, ElegidoFavoritoAction, NuevoDestinoAction } from "./actions";


// Effects
@Injectable()
export class DestinosViajesEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
    map( (action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino) )
  );
  constructor(private actions$: Actions) {}
}