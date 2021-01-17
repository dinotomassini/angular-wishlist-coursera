import { DestinoViaje } from "../models/destino-viaje.model";
import { DestinosViajesActions, DestinosViajesActionTypes, ElegidoFavoritoAction, NuevoDestinoAction } from "./actions";
import { DestinosViajesState } from "./state";


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
  }
  return state;
}