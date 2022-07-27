import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
import { environment } from "../../../../../../../environments/environment";
import Organisation from 'src/app/shared/models/organisations/organisation';
import AmountData from 'src/app/shared/models/donations/amount-data';
import PaymentMethod from 'src/app/shared/models/payment-methods/payment-method';
import {TranslateService} from "@ngx-translate/core";
import {LoadingService} from "../../../../../../core/services/loading.service";
import mixpanel from 'mixpanel-browser';
import {CurrencyHelper} from 'src/app/shared/helpers/currency-helper';
import PaymentIntent from '../../../../../../shared/models/payment-intent/payment-intent';


@Component({
  selector: 'donation-stripe',
  templateUrl: './stripe-donation.component.html',
  styleUrls: ['./stripe-donation.component.scss']
})
export class StripeDonationComponent implements OnInit, AfterViewInit {

  @Input() organisation!: Organisation;

  currentSelected!: AmountData
  currentSelectedPaymentMethod: PaymentMethod | undefined
  inputMode = false;
  customAmount = 0;
  mainGiveButtonDisabled = true;
  loading$ = this.loader.loading$;
  walletPossible = false;
  callToCanUseWalletDone = false;
  paymentRequest: any;

  paymentRequestButton: any;
  stripe: any;
  elements: any;

  modalOpen = false;
  errorText!: string


  constructor(private router: Router, private stripeService: AngularStripeService, public loader: LoadingService, private translate: TranslateService,private http: HttpClient) { }

  ngOnInit(): void {
    //mixpanel.track('page_load', {page: 'donation_page', organisationName: this.organisation.name, organisationData: this.organisation});
    this.mainGiveButtonDisabled = true
  }

  ngAfterViewInit(): void {
    // Can we set the API version somehow? apiVersion: "2020-08-27"
    this.stripeService.setPublishableKey(environment.stripePk).then(
      stripe => {
        this.stripe = stripe;

        //make dummy payment request to check for wallet enableing
        let paymentRequestData = {
          country: this.organisation.country,
          currency: this.organisation.currency.toLowerCase(),
          total: {
            label: this.organisation.name,
            amount: 0
          }
        };

        const dummyPaymentRequest = this.stripe.paymentRequest(paymentRequestData)

        dummyPaymentRequest.canMakePayment().then((result: any) => {
          if (result) {
            this.organisation.paymentMethods = this.organisation.paymentMethods.filter(pm => {
              if (pm.id === 'applepay' && !result.applePay) {
                return false;
              } else if (pm.id === 'googlepay' && !result.googlePay) {
                return false;
              } else {
                return true;
              }
            })
            this.walletPossible = true;
          } else {
            this.organisation.paymentMethods = this.organisation.paymentMethods.filter(pm => {
              return !(pm.id === 'applepay' || pm.id === 'googlepay');
            })
          }
          this.callToCanUseWalletDone = true;
        })
      }
    )
  }

  async submit() {
    this.mainGiveButtonDisabled = true

    if (!this.currentSelectedPaymentMethod) {
      let modalText = 'DonationErrorModal.PaymentMethodNotSelected'
      this.openModal(this.translate.instant('DonationErrorModal.PaymentMethodNotSelected'));
      mixpanel.track('button_pressed', { page: 'donation_page', organisationName: this.organisation.name, error: true, errorMessage: 'PaymentMethodNotSelected' })
      return;
    }

    if (this.inputMode && this.customAmount === 0) {
      this.openModal(this.translate.instant('DonationErrorModal.NoAmountSpecified'));
      mixpanel.track('button_pressed', { page: 'donation_page', organisationName: this.organisation.name, error: true, errorMessage: 'NoAmountSpecified' })
      return;
    } else {
      let amount = 0;
      if (this.inputMode) {
        amount = Math.round(this.customAmount * 100) / 100;
        if (!CurrencyHelper.isValidCustomAmount(amount)) {
          const currencySymbol = CurrencyHelper.getCurrencySymbol(this.organisation.currency)
          this.openModal(this.translate.instant('DonationErrorModal.AmountBetweenPart1') + currencySymbol +
            this.translate.instant('DonationErrorModal.AmountBetweenLowerLimit') +
            this.translate.instant('DonationErrorModal.AmountBetweenPart2') + currencySymbol +
            this.translate.instant('DonationErrorModal.AmountBetweenUpperLimit'));
          return;
        }
      } else {
        amount = this.currentSelected.value;
      }

      if (this.currentSelectedPaymentMethod && (this.currentSelectedPaymentMethod.id === 'googlepay' || this.currentSelectedPaymentMethod.id === 'applepay')) {
        if (this.paymentRequest === undefined) {
          this.openModal(this.translate.instant('DonationErrorModal.WalletError'));
          return
        } else {
          this.paymentRequest.show()
        }
      }

      mixpanel.track('button_pressed', { page: 'donation_page', organisationName: this.organisation.name, error: false, changedToCustomAmount: this.inputMode, paymentMethod: this.currentSelectedPaymentMethod.name })

      localStorage.setItem('organisationName', this.organisation.name);
      localStorage.setItem('organisationThankYou', this.organisation.thankYou);
      localStorage.setItem('organisationTitle', this.organisation.title);
      localStorage.setItem('logoUrl', this.organisation.logoLink);
      localStorage.setItem('wantKnowMoreLink', this.organisation.wantKnowMoreLink);
      localStorage.setItem('privacyPolicyLink', this.organisation.privacyPolicyLink);
      localStorage.setItem('amount', String(amount));
      if (this.currentSelectedPaymentMethod)
        localStorage.setItem('paymentMethod', this.currentSelectedPaymentMethod.id) // this is to store a number in localstorage
      if (!(this.currentSelectedPaymentMethod && (this.currentSelectedPaymentMethod.id === 'googlepay' || this.currentSelectedPaymentMethod.id === 'applepay'))) {
        this.callToCanUseWalletDone = false;
        await this.router.navigate(['/payment']);
      } else {
        this.mainGiveButtonDisabled = false;
      }
    }
  }

  setCurrentSelected(event: AmountData) {
    mixpanel.track('preset_clicked')
    this.currentSelected = event;
    this.checkIfCanUseWalletDoneAndIfSoSetupWallet();
    this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
  }

  setInputMode(inputMode: boolean) {
    this.inputMode = inputMode;
    this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
  }

  saveCustomAmount(customAmount: number) {
    if (customAmount.toString().indexOf(',') != -1) {
      this.customAmount = +customAmount.toString().replace(',', '.')
    } else {
      this.customAmount = customAmount;
    }
    this.checkIfCanUseWalletDoneAndIfSoSetupWallet();
    this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
  }

  setCurrentSelectedPaymentMethod(event: any) {
    this.currentSelectedPaymentMethod = [...this.organisation.paymentMethods].filter(tile => tile.id == event.target.id).pop();
    this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
  }

  private determineMainButtonDisabled() {
    if (this.inputMode) {
      if (CurrencyHelper.isValidCustomAmount(this.customAmount)) {
        return this.currentSelectedPaymentMethod === undefined;
      } else {
        return true
      }
    } else {
      return this.currentSelectedPaymentMethod === undefined;
    }
  }

  checkIfCanUseWalletDoneAndIfSoSetupWallet() {
    if (!this.callToCanUseWalletDone) {
      setTimeout(() => {
        if (this.walletPossible) {
          this.setupWalletPayment()
        }
      }, 1000)
    } else if (this.walletPossible) {
      this.setupWalletPayment();
    }
  }

  setupWalletPayment() {
    // No longer used... 

    // let amount = 0;
    // if (this.inputMode) {
    //   amount = Math.round(this.customAmount * 100) / 100;
    //   if (!CurrencyHelper.isValidCustomAmount(amount)) {
    //     return
    //   }
    // } else {
    //   amount = this.currentSelected.value;
    // }
    // this.paymentRequest = this.stripe.paymentRequest({
    //   country: this.organisation.country,
    //   currency: this.organisation.currency.toLowerCase(),
    //   total: {
    //     label: this.organisation.name,
    //     amount: amount * 100
    //   }
    // })

    // this.paymentRequest.canMakePayment().then((result: any) => {
    //   if (result) {
    //     this.elements = this.stripe.elements()
    //     this.paymentRequestButton = this.elements.create('paymentRequestButton', {
    //       paymentRequest: this.paymentRequest,
    //       style: {
    //         paymentRequestButton: {
    //           theme: 'light',
    //           height: '45px'
    //         }
    //       }
    //     })
    //     this.paymentRequestButton.mount('#payment-request-button');

    //     this.paymentRequest.on('paymentmethod', (ev: any) => {
    //       this.http.post<PaymentIntent>(environment.apiUrl + '/api/donation/intent', {
    //         "amount": amount,
    //         "medium": this.organisation.id,
    //         "paymentMethod": 'googlepay',
    //         "timezoneOffset": new Date().getTimezoneOffset(),
    //         "currency": this.organisation.currency
    //       }).subscribe(pi => {
    //         localStorage.setItem('token', pi.token);
    //         this.stripe.confirmCardPayment(pi.paymentMethodId, { payment_method: ev.paymentMethod.id }, { handleActions: false })
    //           .then((result: any) => {
    //             if (result.error) {
    //               ev.complete('fail');
    //               this.router.navigate(['result', 'failure']);
    //             } else {
    //               ev.complete('success');
    //               this.router.navigate(['result', 'success']);
    //             }
    //           })
    //       })
    //     }
    //     )
    //   }
    // })
  }

  openModal(modalText: string) {
    this.modalOpen = true;
    this.errorText = modalText;
  }

  closeModal() {
    this.modalOpen = false;
    this.callToCanUseWalletDone = true;
  }

}
