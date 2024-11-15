import { Component, OnInit, ElementRef, ViewChild, AfterViewInit , } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(
    googleMaps: GoogleMaps
  ) { }

  loadMap() {
    
  }
  ngOnInit() {
  }

}
