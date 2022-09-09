import { AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import PaymentIntent from '../../../../../shared/models/payment-intent/payment-intent';
import {LoadingService} from "../../../../../core/services/loading.service";
import {environment} from "../../../../../../environments/environment";
import { DOCUMENT } from '@angular/common'; 
import {HttpClient} from "@angular/common/http";
import { AngularWePayService } from '@givtnl/angular-wepay-service'

const apiVersion = "3.0";
const iframeContainerId = "credit-card-iframe";

@Component({
    selector: 'payment-wepay',
    templateUrl: './wepay-payment.component.html',
    styleUrls: ['./wepay-payment.component.scss']
})
export class WepayPaymentComponent implements OnInit, AfterViewInit {

    @Input() paymentMethod: PaymentIntent | undefined;
    clientSelectedPaymentMethod!: string;
    loading$ = this.loader.loading$;
    wepay: any;
    creditCard: any;
    fullName: string | undefined;
    zipCode: string | undefined;


    constructor(private wePayService: AngularWePayService, public loader: LoadingService, @Inject(DOCUMENT) document: Document, private http: HttpClient) { }

    ngOnInit(): void { 
        this.clientSelectedPaymentMethod = localStorage.getItem('paymentMethod')!

    }

    ngAfterViewInit(): void {

        const custom_style = {
            'styles': {
                'cvv-icon': {
                    'base': {
                        'display': 'none'
                    }
                },
                'base': {
                    'height': '44px',
                    'margin': '0',
                    'border-radius': '4px',
                    'font-family': 'Avenir',
                    'font-size': '16px',
                    'color': '#2C2B57',
                    '::placeholder': {
                        'color': '#BCB9C8'
                    },
                    ':focus': {
                        'border': '1px solid #2C2B57'
                    }
                },
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
                // https://dev.wepay.com/clear/create-payment-methods/
                // https://dev.wepay.com/clear/cookbooks/style-credit-card-iframes/

                // The non minimized library can be found here: https://cdn.wepay.com/wepay.full.js

                let error = wepay.configure(
                    environment.production ? "production" : "stage",
                    environment.wePayAppId, apiVersion);
                
                if (error) {
                    console.log(error)
                };


                this.creditCard = wepay.createCreditCardIframe(iframeContainerId, null);
                document.getElementById(iframeContainerId)?.children[0].addEventListener('load', function() {
                    console.log("Finished loading iframe!");
                    // TODO
                    // set iframeReady = true and hide the other form elements till ready
                    // Add loader ??? 
                })
            }
        )
    }


  confirmCardPayment() {
    this.loader.show();

    const tokenizeDetails = {
         "holder_name": this.fullName,
         "address": {
             "postal_code": this.zipCode
        }
    }; 

    console.log(tokenizeDetails);

    this.creditCard.tokenize(tokenizeDetails).then( (response: any) => {
        console.log(response.id);

        // Story ends here. 
        // Backend I/O not needed for this story!
        /*
        this.http.post(environment.apiUrl + '/api/donation/payment', {
            "currency": localStorage.getItem('organisationCurrency'),
            "amount": localStorage.getItem('amount'),
            "medium": localStorage.getItem('organisationMediumId'),
            "paymentProvider": "wepay",
            "paymentToken": response.id,
            "language": navigator.language || "en",
            "timezoneOffset": new Date().getTimezoneOffset(),
        }).subscribe(data => {
            console.log(data);
        })
        */
    })
    .catch(function(error:any) {
        console.log(error);
        // TODO input validation should be managed here
        // TODO error mgmt
    })

    this.loader.hide();
  }
}
