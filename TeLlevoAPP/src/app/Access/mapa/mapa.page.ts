import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;

  map!: mapboxgl.Map;
  currentLocation!: [number, number];
  /* 
    'pk.eyJ1IjoiZG9udWdvIiwiYSI6ImNtM2ppNnJ0MjAzcmMyaXBybGJqZjNsOGIifQ.SVc0f2cIc1hr2rfL70bZfQ'
  */

  constructor() {}

  ngOnInit() {
    // Configurar la clave de Mapbox
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZG9udWdvIiwiYSI6ImNtM2ppNnJ0MjAzcmMyaXBybGJqZjNsOGIifQ.SVc0f2cIc1hr2rfL70bZfQ';

    // Obtener la ubicación actual
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.currentLocation = [position.coords.longitude, position.coords.latitude];
        this.loadMap(this.currentLocation);
      },
      (error) => console.error('Error obteniendo ubicación', error),
      { enableHighAccuracy: true }
    );
  }

  loadMap(center: [number, number]) {
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center, // Coordenadas iniciales [longitud, latitud]
      zoom: 14, // Nivel de zoom inicial
    });

    // Agregar marcador para la ubicación actual
    new mapboxgl.Marker().setLngLat(center).addTo(this.map);
  }


  async generateRoute() {
    const start = (document.getElementById('start') as HTMLInputElement).value;
    const end = (document.getElementById('end') as HTMLInputElement).value;

    if (!start || !end) {
      alert('Por favor, ingresa el punto de partida y el destino.');
      return;
    }

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?steps=true&geometries=geojson&access_token=${(mapboxgl as any).accessToken}`;

    const response = await fetch(directionsUrl);
    const data = await response.json();

    const route = data.routes[0].geometry.coordinates;

    // Dibujar la ruta en el mapa
    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      },
    });

    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#3880ff',
        'line-width': 5,
      },
    });
  }

  
}
