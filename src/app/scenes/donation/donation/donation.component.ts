import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import AmountData from 'src/app/shared/models/donations/amount-data';
import Organisation from 'src/app/shared/models/organisations/organisation';
import PaymentMethod from 'src/app/shared/models/payment-methods/payment-method';
import {LoadingService} from "../../../core/services/loading.service";
import {StripeElementLocale, StripeElementsOptions} from "@stripe/stripe-js";
import PaymentIntent from "../../../shared/models/payment-intent/payment-intent";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
    organisation!: Organisation
    currentSelected!: AmountData
    currentSelectedPaymentMethod: PaymentMethod | undefined
    inputMode = false;
    customAmount = 0;
    mainGiveButtonDisabled = true;
    email = '';
    loading$ = this.loader.loading$;

    paymentRequestButton: any;
    stripe: any;
    elementsOptions: StripeElementsOptions = {
        locale: `${navigator.language}` as StripeElementLocale,
        clientSecret: '',
        appearance: {
            disableAnimations: false,
            theme: "flat",
        }
    };
    elements: any;


    constructor(private router: Router, private route: ActivatedRoute, public loader: LoadingService, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.organisation = this.route.snapshot.data['organisation'];
        this.mainGiveButtonDisabled = true
        this.stripe = window.Stripe!("pk_test_51HmwjvLgFatYzb8pQD7L83GIWCjeNoM08EgF7PlbsDFDHrXR9dbwkxRy2he5kCnmyLuFMSolwgx8xmlmJf5mr33200V44g2q5P");
        this.setupWalletPayment();
    }

    async submit() {
        this.mainGiveButtonDisabled = true

        if (this.currentSelected.id === 0 && (this.inputMode && this.customAmount === 0)) {
            return
        } else {
            let amount = 0;
            if (this.inputMode) {
                amount = Math.round(this.customAmount * 100) / 100;
                if (!DonationComponent.isValidCustomAmount(amount)) {
                    return
                }
            } else {
                amount = this.currentSelected.value;
            }

            localStorage.setItem('organisationName', this.organisation.name)
            localStorage.setItem('logoUrl', this.organisation.logoLink);
            localStorage.setItem('amount', String(amount));
            if (this.currentSelectedPaymentMethod)
                localStorage.setItem('paymentMethod', this.currentSelectedPaymentMethod.id) // this is to store a number in localstorage
            await this.router.navigate(['/payment']);
        }
    }

    setCurrentSelected(event: AmountData) {
        this.currentSelected = event;
        this.setupWalletPayment()
        this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
    }

    setInputMode(inputMode: boolean) {
        this.inputMode = inputMode;
        this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
    }

    saveCustomAmount(customAmount: number) {
        this.customAmount = customAmount;
        this.setupWalletPayment()
        this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
    }

    setCurrentSelectedPaymentMethod(event: any) {
        this.currentSelectedPaymentMethod = [...this.organisation.paymentMethods].filter(tile => tile.id == event.target.id).pop();
        this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
    }

    private determineMainButtonDisabled() {
        if (this.inputMode) {
            if (DonationComponent.isValidCustomAmount(this.customAmount)) {
                return this.currentSelectedPaymentMethod === undefined;
            } else {
                return true
            }
        } else {
            return this.currentSelectedPaymentMethod === undefined;
        }
    }

    private static isValidCustomAmount(amount: number): boolean {
        return amount >= .5 && amount <= 25000;
    }

    setupWalletPayment() {
        this.loader.show();
        let amount = 0;
        if (this.inputMode) {
            amount = Math.round(this.customAmount * 100) / 100;
            if (!DonationComponent.isValidCustomAmount(amount)) {
                return
            }
        } else {
            console.log(this.currentSelected)
            amount = this.currentSelected ? this.currentSelected.value : this.organisation.amounts[1].value;
        }

        this.http.post<PaymentIntent>(environment.apiUrl + '/api/donation/intent', {
            "amount": amount,
            "medium": this.organisation.id,
            "paymentMethod": "googlepay",
            "timezoneOffset": new Date().getTimezoneOffset(),
            "currency": "EUR"
        }).subscribe(pi => {
            localStorage.setItem('token', pi.token);
            this.elementsOptions.clientSecret = pi.paymentMethodId
            const paymentRequest = this.stripe.paymentRequest({
                country: 'BE',
                currency: 'eur',
                total: {
                    label: 'test',
                    amount: amount * 100
                }
            })

            this.elements = this.stripe.elements(this.elementsOptions)
            this.paymentRequestButton = this.elements.create('paymentRequestButton', {
                paymentRequest: paymentRequest
            })

            paymentRequest.canMakePayment().then((result: any) => {
                    this.loader.hide()
                    if (result) {
                        this.paymentRequestButton.mount('#payment-request-button')
                    }

                    paymentRequest.on('paymentmethod', (ev: any) => {
                        this.stripe.confirmCardPayment(pi.paymentMethodId, {payment_method: ev.paymentMethod.id}, {handleActions: false})
                            .then((result: any) => {
                                if (result.error) {
                                    ev.complete('fail');
                                    this.router.navigate(['result', 'failure']);
                                } else {
                                    ev.complete('success');
                                    this.router.navigate(['result', 'success']);
                                }
                            })
                    })
                }
            )
        })
    }
}
