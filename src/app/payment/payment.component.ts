import { Component, OnInit } from '@angular/core';
import {StripeElementsOptions} from "@stripe/stripe-js";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  elementsOptions: StripeElementsOptions = {
    locale: 'nl',
    clientSecret: 'pi_3KdGStLgFatYzb8p2ogTeTzY_secret_ueS2aWoy18SYa5yknewZwkWMq'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
