import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStripeModule } from 'ngx-stripe';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { DonationResolver } from 'src/app/core/resolvers/donation.resolver';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    PaymentComponent
  ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        NgxStripeModule.forRoot('pk_test_51HmwjvLgFatYzb8pQD7L83GIWCjeNoM08EgF7PlbsDFDHrXR9dbwkxRy2he5kCnmyLuFMSolwgx8xmlmJf5mr33200V44g2q5P'),
        MatProgressSpinnerModule
    ],
  providers: [
    DonationResolver
  ]
})
export class PaymentModule { }
