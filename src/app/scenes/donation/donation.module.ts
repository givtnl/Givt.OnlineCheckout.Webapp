import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationRoutingModule } from './donation-routing.module';
import { DonationComponent } from './donation/donation.component';
import { AmountsComponent } from './donation/amounts/amounts.component';
import { SharedModule } from '../../shared/shared.module';
import { OrganisationResolver } from '../../core/resolvers/organisation.resolver';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [DonationComponent, AmountsComponent],
    imports: [
        CommonModule,
        SharedModule,
        DonationRoutingModule,
        MatProgressSpinnerModule,
        TranslateModule,
    ],
    providers: [OrganisationResolver],
})
export class DonationModule {}
