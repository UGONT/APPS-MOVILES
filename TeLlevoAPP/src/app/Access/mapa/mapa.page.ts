import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  map!: mapboxgl.Map;

  constructor() {}

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9udWdvIiwiYSI6ImNtM2ppNnJ0MjAzcmMyaXBybGJqZjNsOGIifQ.SVc0f2cIc1hr2rfL70bZfQ';
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      const userLocation = await Geolocation.getCurrentPosition();
      const lat = userLocation.coords.latitude;
      const lng = userLocation.coords.longitude;

      this.map = new mapboxgl.Map({
        container: this.mapElement.nativeElement, // Asegurado que exista
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 14,
      });

      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
    } catch (error) {
      console.error('Error obteniendo la geolocalización:', error);
    }
  }
}
