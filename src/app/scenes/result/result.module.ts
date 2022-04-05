import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResultRoutingModule} from './result-routing.module';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {NoThanksComponent} from './no-thanks/no-thanks.component';
import {ReceiptComponent} from "./thank-you/receipt/receipt.component";


@NgModule({
    declarations: [
        ThankYouComponent,
        NoThanksComponent,
        ReceiptComponent
    ],
    imports: [
        CommonModule,
        ResultRoutingModule
    ]
})
export class ResultModule {
}
