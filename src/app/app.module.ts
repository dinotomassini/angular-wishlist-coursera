import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from "./app.component";
import { DestinoViajeComponent } from "./destino-viaje/destino-viaje.component";
import { ListaDestinosComponent } from "./lista-destinos/lista-destinos.component";
import { DestinoDetalleComponentComponent } from "./destino-detalle-component/destino-detalle-component.component";
import { FormDestinoViajeComponent } from "./form-destino-viaje/form-destino-viaje.component";
import { DestinosApiClient } from "./models/destinos-api-client-model";
import { 
  DestinosViajesState, 
  initializeDestinosViajesState,
  reducerDestinosViajes,
  DestinosViajesEffects 
} from "./models/destino-viajes-state.model";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: ListaDestinosComponent,
  },
  {
    path: "destino/:id",
    component: DestinoDetalleComponentComponent,
  },
];

// redux init
export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: initializeDestinosViajesState()
};
// fin redux init


@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponentComponent,
    FormDestinoViajeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //registra las rutas
    FormsModule, //agregar un formulario
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(reducers, { 
      initialState: reducersInitialState,
      runtimeChecks: { //Con esto no me da el error de los tipos de actions
        strictActionImmutability: false,
        strictStateImmutability: false
      }      
    },),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([DestinosViajesEffects])
  ],
  providers: [DestinosApiClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
