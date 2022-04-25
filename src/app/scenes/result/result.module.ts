import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResultRoutingModule} from './result-routing.module';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {NoThanksComponent} from './no-thanks/no-thanks.component';
import {ReceiptComponent} from "./thank-you/receipt/receipt.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ResultComponent } from './result/result.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        ThankYouComponent,
        NoThanksComponent,
        ReceiptComponent,
        ResultComponent
    ],
    imports: [
        CommonModule,
        ResultRoutingModule,
        MatProgressSpinnerModule,
        TranslateModule
    ]
})
export class ResultModule {
}
