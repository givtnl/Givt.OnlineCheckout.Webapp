import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DonationRoutingModule} from './donation-routing.module';
import {DonationComponent} from './donation/donation.component';
import {AmountsComponent} from './donation/amounts/amounts.component';
import {SharedModule} from '../../shared/shared.module';
import {OrganisationResolver} from '../../core/resolvers/organisation.resolver';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { TranslateModule } from '@ngx-translate/core';
import { StripeDonationComponent } from './donation/providers/stripe/stripe-donation/stripe-donation.component';
import { WepayDonationComponent } from './donation/providers/wepay/wepay-donation/wepay-donation.component';

@NgModule({
    declarations: [
        DonationComponent,
        AmountsComponent,
        StripeDonationComponent,
        WepayDonationComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        DonationRoutingModule,
        MatProgressSpinnerModule,
        TranslateModule
    ],
    providers: [
        OrganisationResolver
    ]
})
export class DonationModule {
}
