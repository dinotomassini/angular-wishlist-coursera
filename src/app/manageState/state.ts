import { DestinoViaje } from "../models/destino-viaje.model";

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
