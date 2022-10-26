import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment/payment.component';

import { DonationResolver } from 'src/app/core/resolvers/donation.resolver';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DonationModule } from '../donation/donation.module';
import { SharedModule } from '../../shared/shared.module';
import { PaymentGuard } from './payment.guard';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StripePaymentComponent } from './payment/providers/stripe/stripe-payment.component';
import { WepayPaymentComponent } from './payment/providers/wepay/wepay-payment.component';
import { WePayPaymentService } from './payment/providers/wepay/wepay-payment.service';

@NgModule({
    declarations: [
        PaymentComponent,
        StripePaymentComponent,
        WepayPaymentComponent,
    ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        MatProgressSpinnerModule,
        DonationModule,
        SharedModule,
        FormsModule,
        TranslateModule,
        MatIconModule,
        MatCardModule,
    ],
    providers: [DonationResolver, PaymentGuard, WePayPaymentService],
})
export class PaymentModule {}
