import { v4 as uuid } from 'uuid'; 

export class DestinoViaje {
  private selected: boolean;
  public servicios: string[];
  public id = uuid();

  constructor(public lugar: string, public urlImage: string) {
    this.servicios = ["desayuno", "wifi", "parking"];
  }

  isSelected() {
    return this.selected;
  }

  setSelected(valor: boolean) {
    this.selected = valor;
  }
}
