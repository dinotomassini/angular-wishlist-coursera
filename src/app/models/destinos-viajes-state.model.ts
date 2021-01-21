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
  // INIT_MY_DATA = '[Destinos Viajes] Inicializando Datos',
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  ELIMINAR_DESTINO = '[Destinos Viajes] Eliminado',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Voto UP',
  VOTE_DOWN = '[Destinos Viajes] Voto DOWN',
  RESET_VOTES = '[Destinos Viajes] Reseteo Votos'
}

// export class InitMyDataAction implements Action {
//   type = DestinosViajesActionTypes.INIT_MY_DATA;
//   constructor(public destinos: string[]) {}
// }

export class NuevoDestinoAction implements Action {
  type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje) {}
}

export class EliminarDestinoAction implements Action {
  type = DestinosViajesActionTypes.ELIMINAR_DESTINO;
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

export type DestinosViajesActions = 
/* InitMyDataAction | */ NuevoDestinoAction | EliminarDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | ResetVotesAction;


// Reducers
export function reducerDestinosViajes(
  state: DestinosViajesState, 
  action: DestinosViajesActions
): DestinosViajesState {
  switch (action.type) {
    // case DestinosViajesActionTypes.INIT_MY_DATA: {
    //   const destinos: string[] = (action as InitMyDataAction).destinos;
    //   return {
    //     ...state,
    //     items: destinos.map( (dest) => new DestinoViaje(dest, '') )
    //   };
    // }
    case DestinosViajesActionTypes.NUEVO_DESTINO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      };
    }
    case DestinosViajesActionTypes.ELIMINAR_DESTINO: {
      const destino: DestinoViaje = (action as EliminarDestinoAction).destino; 
      return {
        ...state,
        items: state.items.filter( dest => dest.id !== destino.id ),
        favorito: (state.favorito.id === destino.id) ? null : state.favorito
      };
    }
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
      state.items.forEach( destino => destino.setSelected(false) );
      const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
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
