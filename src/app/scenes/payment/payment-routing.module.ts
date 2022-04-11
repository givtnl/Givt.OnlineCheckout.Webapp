import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DonationResolver} from '../../core/resolvers/donation.resolver';
import {PaymentComponent} from './payment/payment.component';
import {PaymentGuard} from "./payment.guard";

const routes: Routes = [
    {
        path: '',
        component: PaymentComponent,
        resolve: {donation: DonationResolver},
        canActivate: [PaymentGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentRoutingModule {
}
