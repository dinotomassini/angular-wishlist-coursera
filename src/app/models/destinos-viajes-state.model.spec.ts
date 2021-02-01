import { 
  reducerDestinosViajes,
  DestinosViajesState,
  initializeDestinosViajesState,
  InitMyDataAction,
  NuevoDestinoAction,
  ElegidoFavoritoAction,
  DestinosViajesActionTypes
} from './destinos-viajes-state.model';
import { DestinoViaje } from './destino-viaje.model';
import { act } from '@ngrx/effects';

describe('reducerDestinosViajes',() => {

  // Iniciar datos
  it('should reduce init data', () => {
    // setup, se crea el estado y se crea la accion que 
    const prevState: DestinosViajesState = initializeDestinosViajesState();
    const action: InitMyDataAction = new InitMyDataAction( ['destino 1', 'destino 2'] );
    
    //action lo que estamos testeando
    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
    
    // lo que deberia suceder // assert
    expect(newState.items.length).toEqual(2);
    expect(newState.items[0].lugar).toEqual('destino 1');

    //tear down (para borrar lo que quedo ingresado en las bases de datos o persistencias)
    // acciones colaterales del testeo
  });

  // Agregar nuevo item
  it('should reduce new item added', () => {
    const prevState: DestinosViajesState = initializeDestinosViajesState();
    const action: NuevoDestinoAction = new NuevoDestinoAction( new DestinoViaje('barcelona', 'url_imagen') );

    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);

    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].lugar).toEqual('barcelona');
  });

  // Marcar el primer destino como favorito
  it('should reduce add favorite first item', () => {
    const initState: DestinosViajesState = initializeDestinosViajesState();
    const actionInit: InitMyDataAction = new InitMyDataAction( ['destino 1', 'destino 2'] );
    const prevState: DestinosViajesState = reducerDestinosViajes(initState, actionInit);
    
    const action: ElegidoFavoritoAction = new ElegidoFavoritoAction(prevState.items[0]);
    const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);

    expect(newState.items[0].isSelected()).toBeTrue();
  });
});