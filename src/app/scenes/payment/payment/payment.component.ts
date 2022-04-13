import {Component, OnInit} from '@angular/core';
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
export class PaymentComponent implements OnInit {
    paymentMethod: PaymentMethod | undefined
    loading$ = this.loader.loading$;
    organisationName!: string
    logoUrl!: string
    stripe: any;
    idealBank: any;

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
        const elements = this.stripe.elements(this.elementsOptions)

        const paymentElement = elements.create("payment");
        paymentElement.mount("#payment-element");

        this.idealBank = elements.create("idealBank", this.idealElementsOptions)
        this.idealBank.mount('#ideal-bank-element')
    }

    ngOnInit(): void {
        let paymentMethod = this.route.snapshot.data['donation'];
        this.elementsOptions.clientSecret = paymentMethod.paymentMethodId;
        localStorage.setItem('token', paymentMethod.token);
        this.organisationName = localStorage.getItem('organisationName')!;
        this.logoUrl = localStorage.getItem('logoUrl')!;
        this.initializeStripe()
        this.setupGenericEventHandler()
    }


    setupGenericEventHandler(): void {
        const localStripeVariable = this.stripe;
        const localClientSecretVariable = this.elementsOptions.clientSecret;
        const form = document.getElementById('payment-form');
        form!.addEventListener('submit', function (event) {
            event.preventDefault();
            // Redirects away from the client
            localStripeVariable.confirmIdealPayment(
                localClientSecretVariable!,
                {
                    return_url: environment.returnUrl,
                }
            );
        });
    }
}
