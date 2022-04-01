import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationComponent } from './geolocation.component';
import { RouterModule, Routes } from '@angular/router';

let routes: Routes = [{ path: '', component: GeolocationComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GeolocationModule {}
