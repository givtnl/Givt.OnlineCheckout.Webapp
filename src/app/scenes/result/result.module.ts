import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResultRoutingModule} from './result-routing.module';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {NoThanksComponent} from './no-thanks/no-thanks.component';
import {ReceiptComponent} from "./thank-you/receipt/receipt.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
    declarations: [
        ThankYouComponent,
        NoThanksComponent,
        ReceiptComponent
    ],
    imports: [
        CommonModule,
        ResultRoutingModule,
        MatProgressSpinnerModule
    ]
})
export class ResultModule {
}
