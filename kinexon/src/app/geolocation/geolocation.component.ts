import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { CarDataService } from '../car-data.service';
import { Car } from '../shared/Data';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
})
export class GeolocationComponent implements OnInit {
  cars!: Car[];
  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;
  markers: google.maps.Marker[] = [];

  loadMarkers(cars: Car[]) {
    cars.forEach((car: Car) => {
      const marker = new google.maps.Marker({
        position: { lat: +car.location[0], lng: +car.location[1] },
        map: this.map,
        title: car.driverName,
      });

      this.markers.push(marker);

      marker.addListener('click', () => {
        this.infoWindow.close();
        this.infoWindow.setContent(marker.getTitle());
        this.infoWindow.open(marker.getMap(), marker);
      });
    });
  }

  showDriverInfo(car: Car) {
    let idx = this.cars.indexOf(car);
    let selectedMarker = this.markers[idx];
    this.infoWindow.close();
    this.infoWindow.setContent(selectedMarker.getTitle());
    this.infoWindow.open(selectedMarker.getMap(), selectedMarker);
    //for some reason when infoWindow is opened via showDriverInfo, there is black left-border and bottom-border around the close button 'x'.
  }

  setMapOnAll(map: google.maps.Map | null) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  updateCarLocations() {
    setInterval(() => {
      this.setMapOnAll(null);
      this.carDataService.getCarsData().subscribe((data: Car[]) => {
        this.cars = data;
        this.markers = [];
        this.loadMarkers(this.cars);
      });
    }, 5000);
  }

  constructor(private carDataService: CarDataService) {}

  ngOnInit() {
    let loader = new Loader({
      apiKey: 'my-api-key'
    });

    loader.load().then(() => {
      this.carDataService.getCarsData().subscribe((data: Car[]) => {
        this.cars = data;
        this.map = new google.maps.Map(document.getElementById('map')!, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
        });
        this.infoWindow = new google.maps.InfoWindow();
        this.loadMarkers(this.cars);
      });

      this.updateCarLocations();
    });
  }
}
