import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DestinoViaje } from "./destino-viaje.model";


// Estado
// Interface (modelo)
export interface DestinosViajesState {
  items: DestinoViaje[];
  loading: boolean; //para estar viendo y ver si se esta trabajando en algo
  favorito: DestinoViaje;
}

// Inicializacion
export const initializeDestinoViajesState = () => {
  return {
    items: [],
    loading: false,
    favorito: null
  };
}


// Acciones
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito'
}

export class NuevoDestinoAction implements Action {
  type: DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
  type: DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViaje) {}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction;


// Reducers
export function reducerDestionsViajes(
  state: DestinosViajesState, 
  action: DestinosViajesActions
): DestinosViajesState {
  switch (action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      };
    }
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
      state.items.forEach( destino => destino.setSelected(false));
      const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
      fav.setSelected(true);
      return {
        ...state,
        favorito: fav
      };
    }
    default: {
      return state;
    }
  }
}


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
