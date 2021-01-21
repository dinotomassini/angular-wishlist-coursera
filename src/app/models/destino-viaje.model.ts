import { v4 as uuid } from 'uuid'; 

export class DestinoViaje {
  public id = uuid();
  public servicios: string[];
  private selected: boolean;
  public votes: number;


  constructor(public lugar: string, public urlImage: string) {
    this.servicios = ["desayuno", "wifi", "parking"];
    this.votes = 0;

  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(valor: boolean): void {
    this.selected = valor;
  }

  votarSi() {
    this.votes++;
  }

  votarNo() {
    this.votes--;
  }

  resetVotes() {
    this.votes = 0;
  }
}
