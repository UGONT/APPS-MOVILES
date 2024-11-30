import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

  viajes = [
    {
      destino: 'Los Alerces 2725',
      fecha: '18/11/2024',
      hora: '14:30',
      costo: 15000,
      conductor: 'Juan Pérez',
      patente: 'ABC-123',
    },
    {
      destino: 'Isla Mocha 3274',
      fecha: '15/11/2024',
      hora: '10:00',
      costo: 25000,
      conductor: 'María López',
      patente: 'XYZ-789',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
