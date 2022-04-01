import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './shared/Data';

@Injectable({
  providedIn: 'root',
})
export class CarDataService {
  constructor(private http: HttpClient) {}

  getCarsData(): Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:3000');
  }
}
