import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SetupDonationComponent} from "./components/setup-donation/setup-donation.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {ThankYouComponent} from "./components/thank-you/thank-you.component";
import {OrganisationResolver} from "./services/organisation.resolver";
import {ErrorComponent} from "./components/error/error.component";

const routes: Routes = [
  { path: '', component: SetupDonationComponent, resolve: {organisation: OrganisationResolver}},
  { path: 'payment', component: PaymentComponent},
  { path: 'thank-you', component: ThankYouComponent},
  { path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
