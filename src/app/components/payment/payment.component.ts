import { Component, OnInit } from '@angular/core';
import {StripeElementsOptions} from "@stripe/stripe-js";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentMethodId} from "../../models/models";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentMethodId: PaymentMethodId | undefined

  elementsOptions: StripeElementsOptions = {
    locale: 'nl',
    clientSecret: '',
    appearance: {
      disableAnimations: false,
      theme: "flat",
    }
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.elementsOptions.clientSecret = this.route.snapshot.data['donation'].paymentMethodId
  }
}
