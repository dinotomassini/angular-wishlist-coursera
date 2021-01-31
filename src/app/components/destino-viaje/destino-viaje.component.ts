import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Output,
  EventEmitter,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { trigger, state, style, transition, animate } from '@angular/animations';

import { AppState } from "../../app.module";
import { DestinoViaje } from "../../models/destino-viaje.model";
import { VoteUpAction, VoteDownAction, ResetVotesAction, EliminarDestinoAction } from "../../models/destinos-viajes-state.model";

@Component({
  selector: "app-destino-viaje",
  templateUrl: "./destino-viaje.component.html",
  styleUrls: ["./destino-viaje.component.css"],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({ backgroundColor: 'PaleTurquoise' })),
      state('estadoNoFavorito', style({ backgroundColor: 'WhiteSmoke' })),
      transition('estdoNoFavorito => estadoFavorito', [ animate('3s') ]),
      transition('estadoFavorito => estadoNoFavorito', [ animate('1s') ])
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @Input() position: number;
  @Output() clicked: EventEmitter<DestinoViaje>;
  @HostBinding("attr.class") cssClass = "mb-3";

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {}

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }

  resetVotes() {
    this.store.dispatch(new ResetVotesAction(this.destino));
    return false;
  }

  eliminar() {
    this.store.dispatch(new EliminarDestinoAction(this.destino));
    return false
  }
}
