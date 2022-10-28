import {
    AfterViewInit,
    Component,
    Inject,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import PaymentIntent from '../../../../../shared/models/payment-intent/payment-intent';
import { LoadingService } from '../../../../../core/services/loading.service';
import { environment } from '../../../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AngularWePayService } from '@givtnl/angular-wepay-service';
import { WePayPaymentService } from './wepay-payment.service';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';

const apiVersion = '3.0';
const iframeContainerId = 'credit-card-iframe';

@Component({
    selector: 'payment-wepay',
    templateUrl: './wepay-payment.component.html',
    styleUrls: ['./wepay-payment.component.scss'],
})
export class WepayPaymentComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() paymentMethod: PaymentIntent | undefined;
    clientSelectedPaymentMethod!: string;
    onDestroy$: Subject<boolean> = new Subject();
    loading$ = this.loader.loading$;
    wepay: any;
    creditCard: any;
    fullName: string | undefined;
    zipCode: string | undefined;
    options: any;

    constructor(
        private router: Router,
        private wePayService: AngularWePayService,
        public loader: LoadingService,
        private wePayPaymentService: WePayPaymentService,
        @Inject(DOCUMENT) document: Document,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.clientSelectedPaymentMethod =
            localStorage.getItem('paymentMethod')!;
    }

    ngAfterViewInit(): void {
        this.initWePayIFrameOptions();
        this.initWePayIFrame();
    }

    initWePayIFrameOptions() {
        const custom_style = {
            styles: {
                'cvv-icon': {
                    base: {
                        display: 'none',
                    },
                },
                base: {
                    height: '40px',
                    margin: '0',
                    'border-radius': '0.25rem',
                    'font-family': 'Avenir',
                    'font-size': '16px',
                    color: '#2C2B57',
                    '::placeholder': {
                        color: '#BCB9C8',
                    },
                    ':focus': {
                        border: '1px solid #2C2B57',
                    },
                },
                invalid: {
                    border: '2px solid #D73C49',
                },
                valid: {
                    border: '1px solid #41C98E',
                },
                errors: {
                    invalid: {
                        color: '#D73C49',
                    },
                },
            },
        };

        this.options = {
            custom_style: custom_style,
            show_labels: false,
            show_placeholders: true,
            show_error_messages: false,
            show_error_messages_when_unfocused: false,
        };
    }

    initWePayIFrame() {
        this.wePayService.create().then((wepay) => {
            this.loader.show();
            this.wepay = wepay;

            let error = wepay.configure(
                environment.production ? 'production' : 'stage',
                environment.wePayAppId,
                apiVersion
            );

            if (error) {
                console.log(error);
            }
            this.creditCard = wepay.createCreditCardIframe(
                iframeContainerId,
                this.options
            );

            document
                .getElementById(iframeContainerId)
                ?.children[0].addEventListener('load', () => {
                    this.loader.hide();
                });
        });
    }

    async confirmCardPayment() {
        this.loader.show();

        const tokenizeDetails = {
            holder_name: this.fullName,
            address: {
                postal_code: this.zipCode,
            },
        };
        let wePayToken;
        try {
            let reponse = await this.creditCard.tokenize(tokenizeDetails);
            wePayToken = reponse.id;
        } catch (error) {
            this.router.navigate(['result', 'failure']);
        }

        this.wePayPaymentService
            .processAnonymousDonation(this.zipCode!, wePayToken)
            .pipe(
                takeUntil(this.onDestroy$),
                finalize(() => this.loader.hide())
            )
            .subscribe({
                next: (_) => {
                    this.router.navigate(['result', 'success']);
                },
                error: () => this.router.navigate(['result', 'failure']),
            });
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.unsubscribe();
    }
}
