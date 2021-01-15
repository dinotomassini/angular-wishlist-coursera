import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Output,
  EventEmitter,
} from "@angular/core";
import { DestinoViaje } from "../models/destino-viaje.model";

@Component({
  selector: "app-destino-viaje",
  templateUrl: "./destino-viaje.component.html",
  styleUrls: ["./destino-viaje.component.css"],
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @Input() position: number;
  @Output() clicked: EventEmitter<DestinoViaje>;
  @HostBinding("attr.class") cssClass = "mb-3";

  constructor() {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {}

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }
}
