import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import { DonationComponent } from './donation/donation.component';
import { AmountComponent } from './donation/amount/amount.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DonationComponent,
    AmountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DonationRoutingModule
  ]
})
export class DonationModule { }
