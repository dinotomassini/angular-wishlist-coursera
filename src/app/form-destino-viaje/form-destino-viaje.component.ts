import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from "@angular/forms";
import { DestinoViaje } from "../models/destino-viaje.model";

@Component({
  selector: "app-form-destino-viaje",
  templateUrl: "./form-destino-viaje.component.html",
  styleUrls: ["./form-destino-viaje.component.css"],
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud: number = 5;

  constructor(private fb: FormBuilder) {
    //inicializar
    this.onItemAdded = new EventEmitter();
    //vinculacion con un tag html
    this.fg = this.fb.group({
      lugar: ["", Validators.compose([
        Validators.required,
        // this.lugarValidator,
        this.lugarValidatorParamtrizable(this.minLongitud)
      ])],
      urlImage: ["", Validators.required],
    });

    //observer de tipeo
    this.fg.valueChanges.subscribe((form: any) => {
      console.log("cambio el formulario: ", form);
    });
  }

  ngOnInit(): void {}

  guardar(lugar: string, urlImage: string): boolean {
    const destino = new DestinoViaje(lugar, urlImage);
    this.onItemAdded.emit(destino);
    return false;
  }

  lugarValidator(control: FormControl): { [s:string]: boolean } {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      return { invalidLugar: true};
    } else {
      return null;
    }
  }

  lugarValidatorParamtrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        return { minLongLugar: true };
      }
      return null;
    }
  }
}
