import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SetupDonationComponent} from "./setup-donation/setup-donation.component";
import {PaymentComponent} from "./payment/payment.component";
import {ThankYouComponent} from "./thank-you/thank-you.component";

const routes: Routes = [
  { path: '', component: SetupDonationComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'thank-you', component: ThankYouComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
