import { NgModule } from '@angular/core';

import { PhoneNumberPipe } from './phonenumber.pipe';

@NgModule({
  declarations: [PhoneNumberPipe],
  exports: [PhoneNumberPipe],
})
export class SharedModule {}
