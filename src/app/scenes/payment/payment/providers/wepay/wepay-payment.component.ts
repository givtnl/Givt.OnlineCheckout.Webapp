import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import PaymentIntent from '../../../../../shared/models/payment-intent/payment-intent';
import {LoadingService} from "../../../../../core/services/loading.service";
import { AngularWePayService } from '@givtnl/angular-wepay-service'

const appId = "537744";
const apiVersion = "3.0";
const iframeContainerId = "credit-card-iframe";
const iframeContainerLabel = "#creditCardIframe"

@Component({
    selector: 'payment-wepay',
    templateUrl: './wepay-payment.component.html',
    styleUrls: ['./wepay-payment.component.scss']
})
export class WepayPaymentComponent implements OnInit, AfterViewInit {

    @Input() paymentMethod: PaymentIntent | undefined;
    @ViewChild(iframeContainerLabel, { static: false }) public iframeContainer!: ElementRef;
    clientSelectedPaymentMethod!: string;
    loading$ = this.loader.loading$;
    wepay: any;




    constructor(private wePayService: AngularWePayService, public loader: LoadingService) { }

    ngOnInit(): void { 
        this.clientSelectedPaymentMethod = localStorage.getItem('paymentMethod')!

    }

    ngAfterViewInit(): void {

        // window.wkVars = {}

        const custom_style = {
            'styles': {
                // 'cvv-icon': {
                //     'base': {
                //         'display': 'none'
                //     }
                // },
                // 'base': {
                //     'height': '44px',
                //     'margin': '0',
                //     'border-radius': '4px',
                //     'font-family': 'Avenir',
                //     'font-size': '16px',
                //     'color': '#2C2B57',
                //     '::placeholder': {
                //         'color': '#BCB9C8'
                //     },
                //     ':focus': {
                //         'border': '1px solid #2C2B57'
                //     }
                // },
                'invalid': {
                    'border': '2px solid #D73C49'
                },
                'valid': {
                    'border': '1px solid #41C98E'
                },
                'errors': {
                    'invalid': {
                        'color': '#D73C49'
                    }
                }
            }
        };

        const options = {
            custom_style: custom_style,
            show_labels: false,
            show_placeholders: true,
            show_error_messages: false,
            show_error_messages_when_unfocused: false
        };

        this.wePayService.create().then(
            wepay => {
              this.wepay = wepay;

                // javascript library docs: https://dev.wepay.com/sdks-and-libraries/helper-js/
                let error = wepay.configure("stage", appId, apiVersion);
                if (error) {
                    console.log(error)
                };


                wepay.createCreditCardIframe(iframeContainerId, options);
                // wkVars.creditCard = 
                // Doesn't work because the frame is not initialized yet...
                // this.iframeContainer.nativeElement.children[0].onload = function() {
                //     console.log({'event': 'iFrameLoaded'});
                // };
            }
        )


    }


  confirmCardPayment() {
    this.loader.show()
    //mixpanel.track('button_pressed', { page: 'payment_page', organisationName: localStorage.getItem('organisationName') })
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
