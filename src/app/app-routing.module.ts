import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupDonationComponent } from "./components/setup-donation/setup-donation.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { ThankYouComponent } from "./components/thank-you/thank-you.component";
import { ErrorComponent } from "./components/error/error.component";
import { OrganisationResolver } from "./resolvers/organisation.resolver";
import { DonationResolver } from "./resolvers/donation.resolver";
import { PaymentGuard } from './guards/payment-guard/payment.guard';
import { ThankYouGuard } from './guards/thank-you-guard/thank-you.guard';

const routes: Routes = [
  { path: '', component: SetupDonationComponent, resolve: { organisation: OrganisationResolver } },
  { path: 'payment', component: PaymentComponent, resolve: { donation: DonationResolver }, canActivate: [PaymentGuard] },
  { path: 'thank-you', component: ThankYouComponent, canActivate: [ThankYouGuard] },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// @ts-ignore
export class AppRoutingModule { }
