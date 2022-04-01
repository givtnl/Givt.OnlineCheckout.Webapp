import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StripeElementsOptions} from "@stripe/stripe-js";
import {ActivatedRoute, Router} from "@angular/router";
import {StripePaymentElementComponent, StripeService} from 'ngx-stripe';
import PaymentMethod from '../../../shared/models/payment-methods/payment-method';
import {environment} from 'src/environments/environment';
import {LoadingService} from "../../../core/loading.service";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    @ViewChild(StripePaymentElementComponent) paymentElement!: StripePaymentElementComponent;
    paymentMethod: PaymentMethod | undefined
    loading$ = this.loader.loading$;

    paying: boolean = false

    elementsOptions: StripeElementsOptions = {
        locale: 'nl',
        clientSecret: '',
        appearance: {
            disableAnimations: false,
            theme: "flat",
        }
    };

    constructor(private router: Router, private route: ActivatedRoute, private stripeService: StripeService, public loader: LoadingService) {
    }

    ngOnInit(): void {
        this.elementsOptions.clientSecret = this.route.snapshot.data['donation'].paymentMethodId;
    }

    submitPayment(): void {
        this.paying = true
        this.stripeService.confirmPayment({
            confirmParams: {
                return_url: environment.returnUrl
            },
            elements: this.paymentElement.elements,
            redirect: 'if_required'
        }).subscribe(obj => {
            if (obj.paymentIntent) {
                localStorage.clear()
                this.router.navigate(['/thank-you'])
            } else {
                console.log(obj.error)
            }
            this.paying = false
        })
    }
}