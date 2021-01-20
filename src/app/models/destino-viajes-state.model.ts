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
export const initializeDestinosViajesState = () => {
  return {
    items: [],
    loading: false,
    favorito: null
  };
}


// Acciones
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELIMINAR_DESTINO = '[Destinos Viajes] Eliminado',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Voto UP',
  VOTE_DOWN = '[Destinos Viajes] Voto DOWN',
  RESET_VOTES = '[Destinos Viajes] Reset Votes'
}

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
  type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
  type = DestinosViajesActionTypes.VOTE_UP;
  constructor(public destino: DestinoViaje) {}
} 

export class VoteDownAction implements Action {
  type = DestinosViajesActionTypes.VOTE_DOWN;
  constructor(public destino: DestinoViaje) {}
} 

export class ResetVotesAction implements Action {
  type = DestinosViajesActionTypes.RESET_VOTES;
  constructor(public destino: DestinoViaje) {}
}

export class EliminarDestinoAction implements Action {
  type = DestinosViajesActionTypes.ELIMINAR_DESTINO;
  constructor(public destino: DestinoViaje) {}
} 

export type DestinosViajesActions = 
  NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | ResetVotesAction | EliminarDestinoAction;


// Reducers
export function reducerDestinosViajes(
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
      state.items.forEach( destino => destino.setSelected(false) );
      let fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
      fav.setSelected(true);
      return {
        ...state,
        favorito: fav
      };
    }
    case DestinosViajesActionTypes.VOTE_UP: {
      const destino: DestinoViaje = (action as VoteUpAction).destino;
      destino.votarSi();
      return { ...state };
    }
    case DestinosViajesActionTypes.VOTE_DOWN: {
      const destino: DestinoViaje = (action as VoteDownAction).destino;
      destino.votarNo();
      return { ...state };
    }
    case DestinosViajesActionTypes.RESET_VOTES: {
      state.items.forEach( destino => destino.resetVotes() );
      return { ...state };
    }
    case DestinosViajesActionTypes.ELIMINAR_DESTINO: {
      // FALTA IMPLEMENTAR
      return null;
    }
  }
  return state;
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
