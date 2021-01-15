import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DestinoViajeComponent } from "./destino-viaje/destino-viaje.component";
import { ListaDestinosComponent } from "./lista-destinos/lista-destinos.component";
import { DestinoDetalleComponentComponent } from "./destino-detalle-component/destino-detalle-component.component";
import { FormDestinoViajeComponent } from "./form-destino-viaje/form-destino-viaje.component";
import { DestinosApiClient } from "./models/destinos-api-client-model";

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

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponentComponent,
    FormDestinoViajeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //registra las rutas
    FormsModule, //agregar un formulario
    ReactiveFormsModule,
  ],
  providers: [DestinosApiClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
