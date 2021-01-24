import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { from, Observable } from "rxjs";
import { flatMap, mergeMap } from "rxjs/operators";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Dexie } from 'dexie';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { AppComponent } from "./app.component";
import { DestinoViajeComponent } from "./components/destino-viaje/destino-viaje.component";
import { ListaDestinosComponent } from "./components/lista-destinos/lista-destinos.component";
import { DestinoDetalleComponent } from "./components/destino-detalle/destino-detalle.component";
import { FormDestinoViajeComponent } from "./components/form-destino-viaje/form-destino-viaje.component";
import { 
  DestinosViajesState, 
  initializeDestinosViajesState,
  reducerDestinosViajes,
  DestinosViajesEffects, 
  InitMyDataAction
} from "./models/destinos-viajes-state.model";
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from "./guards/usuario-logueado/usuario-logueado.guard";
import { AuthService } from "./services/auth.service";
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { ReservasModule } from './reservas/reservas.module';
import { DestinoViaje } from "./models/destino-viaje.model";


// dexie db
export class Translation {
  constructor(
    public id: number,
    public lang: string,
    public key: string,
    public value: string
  ) {}
}
@Injectable({ providedIn: 'root' })
export class MyDatabase extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>;
  translations: Dexie.Table<Translation, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      destinos: '++id, lugar, urlImage'
    });
    this.version(2).stores({
      destinos: '++id, lugar, urlImage',
      translations: '++id, lang, key, value'
    });
  }
}
export const db = new MyDatabase();
// fin dexie db

// i18n init
class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
      .where('lang')
      .equals(lang)
      .toArray()
      .then( results => {
        if (results.length === 0) {
          return this.http
            .get<Translation[]>(
              `${APP_CONFIG_VALUE.apiEndpoint}/api/translation?lang=${lang}`
            )
            .toPromise()
            .then( apiResults => {
              db.translations.bulkAdd(apiResults);
              return apiResults;
            });
        }
        return results;
      }).then( (traducciones) => {
        console.log('traducciones cargadas');
        console.log(traducciones);
        return traducciones;
      }).then( (traducciones) => {
        return traducciones.map( (t) => ({
          [t.key]: t.value
        }));
      });
    return from(promise)
      .pipe( 
        flatMap/*mergeMap*/( (elems) => from(elems))
      );
      
  }
}
function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}
// fin i18n

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinosViajesState();
}
@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}

  async initializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
    const req = new HttpRequest(
      'GET', 
      `${APP_CONFIG_VALUE.apiEndpoint}/my`, 
      { headers: headers }
    );
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch( new InitMyDataAction(response.body) );
  }
}
// fin app init

// RUTAS
// rutas hijas (sub rutas)
export const childrenRoutesVuelos: Routes = [ //sub rutas de los vuelos
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: 'main', component: VuelosMainComponent
  },
  {
    path: 'mas-info', component: VuelosMasInfoComponent
  },
  {
    path: ':id', component: VuelosDetalleComponent
  }
];
// rutas principales
const routes: Routes = [
  {
    path: "", redirectTo: "home", pathMatch: "full",
  },
  {
    path: "home", component: ListaDestinosComponent,
  },
  {
    path: "destino/:id", component: DestinoDetalleComponent,
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'protected', component: ProtectedComponent, canActivate: [ UsuarioLogueadoGuard ]
  },
  {
    path: 'vuelos', component: VuelosComponent, canActivate: [ UsuarioLogueadoGuard ], children: childrenRoutesVuelos
  }
];
// fin rutas

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
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosMainComponent,
    VuelosMasInfoComponent,
    VuelosDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //agregar un formulario
    ReactiveFormsModule,
    RouterModule.forRoot(routes), //registra las rutas
    NgRxStoreModule.forRoot(reducers, { 
      initialState: reducersInitialState,
      runtimeChecks: { //Con esto no me da el error de los tipos de actions
        strictActionImmutability: false,
        strictStateImmutability: false
      }      
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([DestinosViajesEffects]),
    ReservasModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgxMapboxGLModule
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [ AppLoadService ], multi: true },
    MyDatabase
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
