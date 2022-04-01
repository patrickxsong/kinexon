import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { DriversComponent } from './drivers/drivers.component';
// import { GeolocationModule } from './geolocation/geolocation.module';
// import { GeolocationComponent } from './geolocation/geolocation.component';

const routes: Routes = [
  { path: '', redirectTo: 'drivers', pathMatch: 'full' },
  { path: 'drivers', component: DriversComponent },
  { path: 'driver/:driverName', component: DriverDetailsComponent },
  {
    path: 'location',
    loadChildren: () =>
      import('./geolocation/geolocation.module').then(
        (m) => m.GeolocationModule
      ),
  },
  { path: '**', redirectTo: 'drivers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
