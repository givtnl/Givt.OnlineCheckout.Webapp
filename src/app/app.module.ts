import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupDonationComponent } from './setup-donation/setup-donation.component';
import { PaymentComponent } from './payment/payment.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import {RouterModule} from "@angular/router";
import { AmountComponent } from './setup-donation/amount/amount.component';
import { ReceiptComponent } from './setup-donation/receipt/receipt.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupDonationComponent,
    PaymentComponent,
    ThankYouComponent,
    AmountComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('pk_test_51HmwjvLgFatYzb8pQD7L83GIWCjeNoM08EgF7PlbsDFDHrXR9dbwkxRy2he5kCnmyLuFMSolwgx8xmlmJf5mr33200V44g2q5P'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
