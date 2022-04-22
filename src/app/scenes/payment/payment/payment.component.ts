import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StripeElementLocale, StripeElementsOptions } from "@stripe/stripe-js";
import { ActivatedRoute, Router } from "@angular/router";
import PaymentIntent from '../../../shared/models/payment-intent/payment-intent';
import { LoadingService } from "../../../core/services/loading.service";
import { environment } from "../../../../environments/environment";

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

    constructor(private router: Router, private route: ActivatedRoute, public loader: LoadingService) { }

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
        this.stripe = window.Stripe!("pk_test_51HmwjvLgFatYzb8pQD7L83GIWCjeNoM08EgF7PlbsDFDHrXR9dbwkxRy2he5kCnmyLuFMSolwgx8xmlmJf5mr33200V44g2q5P");
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
                break;
            case "giropay": //giropay
                break;
            case "eps": //EPS
                break;
            case "applepay": //apple pay
                break;
            case "googlepay": //google pay
                const paymentRequest = this.stripe.paymentRequest({
                    country: 'BE',
                    currency: 'eur',
                    total: {
                        label: 'test',
                        amount: (+localStorage.getItem('amount')! * 100)
                    }
                })

                this.paymentRequestButton = this.elements.create('paymentRequestButton', {
                    paymentRequest: paymentRequest
                })

                paymentRequest.canMakePayment().then((result: any) => {
                    if (result) {
                        this.paymentRequestButton.mount('#payment-request-button-gp')
                    } else {
                        document.getElementById('payment-request-button-gp')!.innerHTML = 'You have not enabled google pay or have no valid payment method in google pay. Please try a different approach.'
                    }
                })

                paymentRequest.on('paymentmethod', (ev: any) => {
                    this.stripe.confirmCardPayment(this.elementsOptions.clientSecret, { payment_method: ev.paymentMethod.id }, { handleActions: false })
                        .then((result: any) => {
                            if (result.error) {
                                ev.complete('fail');
                                this.router.navigate(['result', 'success']);
                            } else {
                                ev.complete('success');
                                this.router.navigate(['result', 'fail']);
                            }
                        })
                })
                break;

        }
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
        );
    }

    confirmBancontactPayment(event: Event) {
        event.preventDefault();
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
        this.stripe.confirmPayment({
            elements: this.elements,
            confirmParams: {
                return_url: environment.returnUrl
            }
        }
        )
    }
}
