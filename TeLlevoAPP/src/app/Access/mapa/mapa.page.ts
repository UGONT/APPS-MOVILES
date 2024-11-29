import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;

  map!: mapboxgl.Map;
  currentLocation!: [number, number];

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

    // Crear el Geocoder para autocompletar direcciones
    const geocoder = new MapboxGeocoder({
      accessToken: (mapboxgl as any).accessToken,
      marker: false,  // Deshabilitar el marcador del geocodificador
      mapboxgl: mapboxgl
    });

    // Añadir el Geocoder al mapa
    this.map.addControl(geocoder);

    // Capturar el evento cuando el usuario selecciona una dirección
    geocoder.on('result', (event) => {
      const place = event.result.center; // Las coordenadas seleccionadas
      this.generateRoute();
    });
  }
  /* GENERAR RUTAS WAAAAAAAAAAAAA*/



  async generateRoute() {
    // Usar la ubicación actual como punto de partida
    const start = this.currentLocation;
  
    // Obtener el destino desde el input
    const endInput = (document.getElementById('end') as HTMLInputElement).value;
  
    if (!endInput) {
      alert('Por favor, ingresa un destino.');
      return;
    }
  
    // Utilizar Mapbox Geocoding API para obtener las coordenadas del destino
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(endInput)}.json?access_token=${(mapboxgl as any).accessToken}`;
  
    try {
      const response = await fetch(geocodeUrl);
      if (!response.ok) throw new Error('Error obteniendo las coordenadas del destino');
      const data = await response.json();
      const end = data.features[0].geometry.coordinates;  // Coordenadas del lugar de destino
  
      // Llamar al método para generar la ruta
      await this.generateRoutePath(start, end);
    } catch (error) {
      console.error('Error obteniendo el destino:', error);
      alert('No se pudo obtener la ubicación del destino. Inténtalo de nuevo.');
    }
  }
  
  async generateRoutePath(start: [number, number], end: [number, number]) {
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${(mapboxgl as any).accessToken}`;
  
    try {
      const response = await fetch(directionsUrl);
      if (!response.ok) throw new Error('Error en la API de Directions');
      const data = await response.json();
  
      const route = data.routes[0]?.geometry.coordinates;
      if (!route) {
        alert('No se pudo generar una ruta.');
        return;
      }
  
      // Verificar si ya hay una ruta existente
      if (this.map.getLayer('route')) {
        this.map.removeLayer('route');
      }
      if (this.map.getSource('route')) {
        this.map.removeSource('route');
      }
  
      // Dibujar la nueva ruta en el mapa
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
  
      // Ajustar el zoom para incluir toda la ruta
      const bounds = new mapboxgl.LngLatBounds();
      route.forEach((point: [number, number]) => bounds.extend(point));
      this.map.fitBounds(bounds, { padding: 50 });
    } catch (error) {
      console.error('Error obteniendo la ruta:', error);
      alert('No se pudo generar la ruta. Inténtalo de nuevo.');
    }
  }
  

}
