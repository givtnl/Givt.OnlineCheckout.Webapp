import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StripeElementsOptions} from "@stripe/stripe-js";
import {ActivatedRoute, Router} from "@angular/router";
import PaymentMethod from '../../../shared/models/payment-methods/payment-method';
import {LoadingService} from "../../../core/services/loading.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
    paymentMethod: PaymentMethod | undefined
    loading$ = this.loader.loading$;
    organisationName!: string
    logoUrl!: string
    stripe: any;
    cardPaymentElement: any;
    idealBank: any;
    elements: any
    clientSelectedPaymentMethodIndex!: number

    elementsOptions: StripeElementsOptions = {
        locale: 'nl',
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

    initializeStripe(): void {
        this.stripe = window.Stripe!("pk_test_51HmwjvLgFatYzb8pQD7L83GIWCjeNoM08EgF7PlbsDFDHrXR9dbwkxRy2he5kCnmyLuFMSolwgx8xmlmJf5mr33200V44g2q5P");
        this.elements = this.stripe.elements(this.elementsOptions)
        console.log(this.clientSelectedPaymentMethodIndex)
        switch (this.clientSelectedPaymentMethodIndex) {
            case 0: //bancontact
                break;
            case 1: //card
                this.cardPaymentElement = this.elements.create("payment");
                this.cardPaymentElement.mount("#payment-element");
                break;
            case 2: //iDeal
                this.idealBank = this.elements.create("idealBank", this.idealElementsOptions);
                this.idealBank.mount('#ideal-bank-element');
                break;
            case 3: //sofort
                break;
            case 4: //giropay
                break;
            case 5: //EPS
                break;
            case 6: //apple pay
                break;
            case 7: //google pay
                break;

        }
    }


    ngAfterViewInit(): void {
        this.initializeStripe()
    }

    ngOnInit(): void {
        const paymentMethod = this.route.snapshot.data['donation'];
        this.clientSelectedPaymentMethodIndex = +localStorage.getItem('paymentMethod')!
        this.elementsOptions.clientSecret = paymentMethod.paymentMethodId;
        localStorage.setItem('token', paymentMethod.token);
        this.organisationName = localStorage.getItem('organisationName')!;
        this.logoUrl = localStorage.getItem('logoUrl')!;
    }

    confirmIdealPayment(event: Event) {
        event.preventDefault();
        this.stripe.confirmIdealPayment(
            this.elementsOptions.clientSecret,
            {
                return_url: environment.returnUrl,
                payment_method: {
                    ideal: this.idealBank
                }
            }
        )
    }

    confirmBancontactPayment(event: Event) {
        event.preventDefault();
        this.stripe.confirmBancontactPayment(
            this.elementsOptions.clientSecret,
            {
                return_url: environment.returnUrl
            }
        )
    }

    confirmCardPayment(event: Event) {
        event.preventDefault();
        this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: environment.returnUrl
                }
            }
        )
    }
}
