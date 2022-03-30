import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { PaymentMethod } from '../../models/paymentmethod.enum';
import {AmountData, Organisation, PaymentMethodTile} from "../../models/models";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {
  organisation!: Organisation
  currentSelected!: AmountData
  currentSelectedPaymentMethod: PaymentMethodTile | undefined
  inputMode = false;
  customAmount = 0;
  mainGiveButtonDisabled = true;
  email = '';

  private imgFolder = "../../../assets/paymentMethodIcons/"

  paymentMethods: PaymentMethodTile[] = [
    new PaymentMethodTile("id", "Ideal", this.imgFolder + "ideal.svg", PaymentMethod.Ideal),
    new PaymentMethodTile("ap", "Apple Pay", this.imgFolder + "apay.svg",  PaymentMethod.Card),
    new PaymentMethodTile("gp", "Google Pay", this.imgFolder + "gpay.svg",  PaymentMethod.Card),
    new PaymentMethodTile("cc", "Credit card", this.imgFolder + "cc.svg",  PaymentMethod.Card)
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
        if (!SetupDonationComponent.isValidCustomAmount(amount)) {
          return
        }
      } else {
        amount = this.currentSelected.value;
      }

      localStorage.setItem('amount', String(amount));
      console.log(PaymentMethod.Bancontact.toString());
      if (this.currentSelectedPaymentMethod)
        localStorage.setItem('paymentMethod', this.currentSelectedPaymentMethod.paymentMethod.toString()) // this is to store a number in localstorage

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
      if (SetupDonationComponent.isValidCustomAmount(this.customAmount)) {
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
