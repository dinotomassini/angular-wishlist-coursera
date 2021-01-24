import { Component, OnInit } from '@angular/core';
import { ReservasApiClientService } from '../reservas-api-client.service';

@Component({
  selector: 'app-listado-reservas',
  templateUrl: './listado-reservas.component.html',
  styleUrls: ['./listado-reservas.component.css']
})
export class ListadoReservasComponent implements OnInit {

  constructor(
    public api: ReservasApiClientService
  ) { }

  ngOnInit(): void {
  }

}
