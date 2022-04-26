import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StripeElementLocale, StripeElementsOptions} from "@stripe/stripe-js";
import {ActivatedRoute, Router} from "@angular/router";
import PaymentIntent from '../../../shared/models/payment-intent/payment-intent';
import {LoadingService} from "../../../core/services/loading.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
    paymentMethod: PaymentIntent | undefined
    loading$ = this.loader.loading$;
    organisationName!: string
    logoUrl!: string
    stripe: any;
    cardPaymentElement: any;
    bancontact: any;
    idealBank: any;
    elements: any;
    clientSelectedPaymentMethod!: string;
    paymentRequestButton: any;
    bancontactHolderName: string = "";

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

    constructor(private router: Router, private route: ActivatedRoute, public loader: LoadingService) {
    }

    ngOnInit(): void {
        const paymentMethod = this.route.snapshot.data['donation'];
        this.clientSelectedPaymentMethod = localStorage.getItem('paymentMethod')!
        this.elementsOptions.clientSecret = paymentMethod.paymentMethodId;
        localStorage.setItem('token', paymentMethod.token);
        this.organisationName = localStorage.getItem('organisationName')!;
        this.logoUrl = localStorage.getItem('logoUrl')!;
    }

    ngAfterViewInit(): void {
        this.initializeStripe()
    }


    initializeStripe(): void {
        this.stripe = window.Stripe!(environment.stripePk);
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
                break;
            case "sofort": //sofort
            case "giropay": //giropay
            case "eps": //EPS
            default:
                break;
        }
    }

    confirmIdealPayment(event: Event) {
        event.preventDefault();
        this.loader.show()
        this.stripe.confirmIdealPayment(
            this.elementsOptions.clientSecret,
            {
                return_url: environment.returnUrl,
                payment_method: {
                    ideal: this.idealBank
                }
            }
        );
    }

    confirmBancontactPayment(event: Event) {
        event.preventDefault();
        this.loader.show()
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

    confirmCardPayment(event: Event) {
        event.preventDefault();
        this.loader.show()
        this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: environment.returnUrl
                }
            }
        )
    }
}
