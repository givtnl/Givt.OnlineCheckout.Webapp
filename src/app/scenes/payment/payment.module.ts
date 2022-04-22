import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentRoutingModule} from './payment-routing.module';
import {PaymentComponent} from './payment/payment.component';
import {DonationResolver} from 'src/app/core/resolvers/donation.resolver';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DonationModule} from "../donation/donation.module";
import {SharedModule} from "../../shared/shared.module";
import {PaymentGuard} from "./payment.guard";
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        PaymentComponent,
    ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        MatProgressSpinnerModule,
        DonationModule,
        SharedModule,
        FormsModule
    ],
    providers: [
        DonationResolver,
        PaymentGuard
    ]
})
export class PaymentModule {
}
