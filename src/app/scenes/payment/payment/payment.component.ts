import {Component, OnInit} from '@angular/core';
import {StripeElementsOptions} from "@stripe/stripe-js";
import {ActivatedRoute, Router} from "@angular/router";
import PaymentMethod from '../../../shared/models/payment-methods/payment-method';
import {LoadingService} from "../../../core/services/loading.service";

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

    paying: boolean = false

    elementsOptions: StripeElementsOptions = {
        locale: 'nl',
        clientSecret: '',
        appearance: {
            disableAnimations: false,
            theme: "flat",
        }
    };

    constructor(private router: Router, private route: ActivatedRoute, public loader: LoadingService) {
    }

    initializeStripe(): void {
        let stripe = window.Stripe!("pk_test_51HmwjvLgFatYzb8pQD7L83GIWCjeNoM08EgF7PlbsDFDHrXR9dbwkxRy2he5kCnmyLuFMSolwgx8xmlmJf5mr33200V44g2q5P");
        const elements = stripe.elements(this.elementsOptions)
        const paymentElement = elements.create("payment");
        paymentElement.mount("#payment-element");
    }

    ngOnInit(): void {
        let paymentMethod = this.route.snapshot.data['donation'];
        this.elementsOptions.clientSecret = paymentMethod.paymentMethodId;
        localStorage.setItem('token', paymentMethod.token);
        this.organisationName = localStorage.getItem('organisationName')!;
        this.logoUrl = localStorage.getItem('logoUrl')!;
        this.initializeStripe()
    }

    /*submitPayment(): void {
        this.paying = true
        this.stripeService.confirmPayment({
            confirmParams: {
                return_url: environment.returnUrl
            },
            elements: this.paymentElement.elements,
            redirect: 'if_required'
        }).subscribe(obj => {
            if (obj.paymentIntent) {
                this.router.navigate(['result','success'])
            } else {
                console.log(obj.error)
            }
            this.paying = false
        })
    }*/
}
