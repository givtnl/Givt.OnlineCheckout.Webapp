import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupDonationComponent } from './components/setup-donation/setup-donation.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { AmountsComponent } from './components/setup-donation/amount/amounts.component';
import { ReceiptComponent } from './components/setup-donation/receipt/receipt.component';
import { HttpClientModule } from "@angular/common/http";
import { ApplicationService } from "./services/application.service";
import { OrganisationResolver } from "./services/organisation.resolver";

@NgModule({
  declarations: [
    AppComponent,
    SetupDonationComponent,
    PaymentComponent,
    ThankYouComponent,
    AmountsComponent,
    ReceiptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51HmwjvLgFatYzb8pQD7L83GIWCjeNoM08EgF7PlbsDFDHrXR9dbwkxRy2he5kCnmyLuFMSolwgx8xmlmJf5mr33200V44g2q5P'),
  ],
  providers: [ApplicationService, OrganisationResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
