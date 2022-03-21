import { Component, OnInit } from '@angular/core';
import {StripeElementsOptions} from "@stripe/stripe-js";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  elementsOptions: StripeElementsOptions = {
    locale: 'nl',
    clientSecret: '',
    appearance: {
      disableAnimations: false,
      theme: "flat",
    }
  };

  constructor(private router: Router, private route: ActivatedRoute) {
    const paymentMethodId = this.route.snapshot.queryParamMap.get('paymentMethodId');
    if (paymentMethodId != null) {
      this.elementsOptions.clientSecret = paymentMethodId;
    }
    console.log(this.elementsOptions.clientSecret);
  }

  ngOnInit(): void {
  }
}
