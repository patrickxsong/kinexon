import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../shared/Data';
import { CarDataService } from '../car-data.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  carsData: Car[] = [];
  filteredCars: Car[] = [];

  filter(data: string) {
    if (data) {
      this.filteredCars = this.carsData.filter((car: Car) => {
        return (
          car.driverName.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          car.driverCityOrigin.toLocaleLowerCase().indexOf(data.toLowerCase()) >
            -1
        );
      });
    } else {
      this.filteredCars = this.carsData;
    }
  }

  constructor(private carDataService: CarDataService) {}

  ngOnInit() {
    this.carDataService.getCarsData().subscribe((data: Car[]) => {
      this.carsData = data;
      // this.filteredCars = data;
      this.filter('');
    });
  }
}
