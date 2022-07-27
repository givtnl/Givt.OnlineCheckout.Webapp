import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
import PaymentIntent from '../../../../../shared/models/payment-intent/payment-intent';
import { environment } from "../../../../../../environments/environment";
import { StripeElementLocale, StripeElementsOptions } from "@stripe/stripe-js";
import {LoadingService} from "../../../../../core/services/loading.service";

import {TranslateService} from "@ngx-translate/core";
import mixpanel from 'mixpanel-browser';


@Component({
  selector: 'payment-stripe',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit, AfterViewInit {

  @Input() paymentMethod: PaymentIntent | undefined
  loading$ = this.loader.loading$;
  stripe: any;
  cardPaymentElement: any;
  bancontact: any;
  idealBank: any;
  elements: any;
  clientSelectedPaymentMethod!: string;
  paymentRequestButton: any;
  bancontactHolderName: string = "";
  bancontactHolderNameValid: boolean | undefined;
  bankSelected = false;

  elementsOptions: StripeElementsOptions = {
    locale: `${navigator.language}` as StripeElementLocale,
    clientSecret: '',
    appearance: {
      disableAnimations: false,
      theme: "flat",
    }
  };
  idealElementsOptions = {
    style: {
      base: {
        padding: '10px 12px',
        color: '#32325d',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
      },
    },
  };

  constructor(private stripeService: AngularStripeService, public loader: LoadingService, private translate: TranslateService) { }

  ngOnInit(): void {
    //mixpanel.track('page_load', { page: 'payment_page', organisationName: localStorage.getItem('organisationName') });
    this.clientSelectedPaymentMethod = localStorage.getItem('paymentMethod')!
    if(this.paymentMethod){
      this.elementsOptions.clientSecret = this.paymentMethod.paymentMethodId;
      localStorage.setItem('token', this.paymentMethod.token);
    }
  }

  ngAfterViewInit(): void {
    this.initializeStripe()
  }


  initializeStripe(): void {
    this.stripeService.setPublishableKey(environment.stripePk).then(
      stripe => {
        this.stripe = stripe;
        this.elements = this.stripe.elements(this.elementsOptions)
        switch (this.clientSelectedPaymentMethod) {
          case "bancontact": //bancontact
            break;
          case "card": //card
            this.cardPaymentElement = this.elements.create("payment");
            this.cardPaymentElement.mount("#payment-element");
            break;
          case "ideal": //iDeal
            this.idealBank = this.elements.create("idealBank", this.idealElementsOptions);
            this.idealBank.mount('#ideal-bank-element');
            this.idealBank.on('change', (event: any) => {
              this.bankSelected = true;
            })
            break;
          case "sofort": //sofort
          case "giropay": //giropay
          case "eps": //EPS
          default:
            break;
        }
      }
    )
  }

  confirmIdealPayment() {
    this.loader.show()
    mixpanel.track('button_pressed', { page: 'payment_page', organisationName: localStorage.getItem('organisationName') })
    if (this.bankSelected) {
        this.stripe.confirmIdealPayment(
            this.elementsOptions.clientSecret,
            {
                return_url: environment.returnUrl,
                payment_method: {
                    ideal: this.idealBank
                }
            }
        );
    } else {
        this.loader.hide()
        return
    }
  }

  bancontactHolderNameChanged() {
    if (!this.bancontactHolderName != undefined) {
      this.bancontactHolderNameValid = this.bancontactHolderName !== ""
      return;
    }
  }

  confirmBancontactPayment() {
    if (!this.bancontactHolderName) {
      this.bancontactHolderNameValid = false;
      return;
    }
    this.loader.show()
    mixpanel.track('button_pressed', { page: 'payment_page', organisationName: localStorage.getItem('organisationName') })
    this.stripe.confirmBancontactPayment(
        this.elementsOptions.clientSecret,
        {
            return_url: environment.returnUrl,
            payment_method: {
                billing_details: {
                    name: this.bancontactHolderName
                }
            }
        },
    );
  }

  confirmCardPayment() {
    this.loader.show()
    mixpanel.track('button_pressed', { page: 'payment_page', organisationName: localStorage.getItem('organisationName') })
    // ConfirmPayment
    // const error = this.stripe.confirmPayment({
    //         elements: this.elements,
    //         confirmParams: {
    //             return_url: environment.returnUrl
    //         }
    //     }
    // ).then((error: any) => {
    //     console.log(error)
    //     if (error) {
    //         this.loader.hide()
    //     }
    // })
  }
}