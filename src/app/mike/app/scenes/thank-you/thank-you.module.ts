import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouRoutingModule } from './thank-you-routing.module';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ReceiptComponent } from './thank-you/receipt/receipt.component';


@NgModule({
  declarations: [
    ThankYouComponent,
    ReceiptComponent
  ],
  imports: [
    CommonModule,
    ThankYouRoutingModule
  ]
})
export class ThankYouModule { }
