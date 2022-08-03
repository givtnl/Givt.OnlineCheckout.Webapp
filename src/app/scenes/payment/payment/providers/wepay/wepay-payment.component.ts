import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import PaymentIntent from '../../../../../shared/models/payment-intent/payment-intent';
import {LoadingService} from "../../../../../core/services/loading.service";
import { AngularWePayService } from '@givtnl/angular-wepay-service'

const appId = "631644";
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
    creditCard: any;
    fullName: string | undefined;
    zipCode: string | undefined;


    constructor(private wePayService: AngularWePayService, public loader: LoadingService) { }

    ngOnInit(): void { 
        this.clientSelectedPaymentMethod = localStorage.getItem('paymentMethod')!

    }

    ngAfterViewInit(): void {

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


                this.creditCard = wepay.createCreditCardIframe(iframeContainerId, null);
                // Doesn't work because the frame is not initialized yet...
                // this.iframeContainer.nativeElement.children[0].onload = function() {
                //     console.log({'event': 'iFrameLoaded'});
                // };
            }
        )


    }


  confirmCardPayment() {
    this.loader.show()
    console.log(this.fullName);
    console.log(this.zipCode);

    const tokenizeDetails = {
         "holder_name": this.fullName,
         "address": {
             "postal_code": this.zipCode
        }
    }; 

    this.creditCard.tokenize(tokenizeDetails).then(function(response:any) {
        console.log(response.id);
    })
    .catch(function(error:any){

        console.log(error);
        // TODO input validation should be managed here
        // TODO error mgmt
    })

    this.loader.hide();
  }
}
