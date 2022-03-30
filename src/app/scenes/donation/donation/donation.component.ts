import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import AmountData from 'src/app/shared/models/donations/amount-data';
import Organisation from 'src/app/shared/models/organisations/organisation';
import PaymentMethodTile from 'src/app/shared/models/payment-methods/payment-method-tile';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  organisation!: Organisation
  currentSelected!: AmountData
  currentSelectedPaymentMethod: PaymentMethodTile | undefined
  inputMode = false;
  customAmount = 0;
  mainGiveButtonDisabled = true;
  email = '';

  private imgFolder = "../../../assets/paymentMethodIcons/"

  paymentMethods: PaymentMethodTile[] = [
    new PaymentMethodTile("bc", "bancontact", this.imgFolder + "bancontact.svg"),
    new PaymentMethodTile("ap", "Apple Pay", this.imgFolder + "apay.svg"),
    new PaymentMethodTile("gp", "Google Pay", this.imgFolder + "gpay.svg"),
    new PaymentMethodTile("cc", "Credit card", this.imgFolder + "cc.svg")
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let incomingOrganisation = this.route.snapshot.data['organisation'];
    this.organisation = Organisation.fromIncomingOrganisation(incomingOrganisation)
    this.mainGiveButtonDisabled = true
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

      localStorage.setItem('amount', String(amount));
      await this.router.navigate(['/payment']);
    }
  }

  setCurrentSelected(event: AmountData) {
    this.currentSelected = event;
    this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
  }

  setInputMode(inputMode: boolean) {
    this.inputMode = inputMode;
    this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
  }

  saveCustomAmount(customAmount: number) {
    this.customAmount = customAmount;
    this.mainGiveButtonDisabled = this.determineMainButtonDisabled();
  }

  setCurrentSelectedPaymentMethod(event: any) {
    let paymentMethodsCopy = [...this.paymentMethods]
    this.currentSelectedPaymentMethod = paymentMethodsCopy.filter(tile => tile.id == event.target.id).pop();
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
}
