import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../shared/Data';
import { CarDataService } from '../car-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['../drivers/drivers.component.css'],
})
export class DriverDetailsComponent implements OnInit {
  car!: Car;

  constructor(
    private route: ActivatedRoute,
    private carDataService: CarDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.carDataService.getCarsData().subscribe((data: Car[]) => {
        let idx = data.findIndex(
          (object: Car) => object.driverName === params['driverName']
        );
        this.car = data[idx];
      });
    });
  }
}
