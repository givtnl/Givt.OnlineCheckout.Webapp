import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AmountData, Organisation, PaymentMethodTile} from "../../models/models";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {
  organisation!: Organisation
  currentSelected!: AmountData
  inputMode = false;
  customAmount = 0;
  mainGiveButtonDisabled = true;
  continueButtonDisabled = false;
  email = '';

  paymentMethods: PaymentMethodTile[] = [
    new PaymentMethodTile("bc", "bancontact", "../../../assets/paymentMethodIcons/bancontact.svg"),
    new PaymentMethodTile("ap", "Apple Pay", "../../../assets/paymentMethodIcons/apay.svg"),
    new PaymentMethodTile("gp", "Google Pay", "../../../assets/paymentMethodIcons/gpay.svg"),
    new PaymentMethodTile("cc", "Credit card", "../../../assets/paymentMethodIcons/cc.svg")
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let incomingOrganisation = this.route.snapshot.data['organisation'];
    this.organisation = Organisation.fromIncomingOrganisation(incomingOrganisation)
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
      await this.router.navigate(['/payment']);
    }
  }



  setCurrentSelected(event: AmountData) {
    this.currentSelected = event;
    this.mainGiveButtonDisabled = false;
  }

  setInputMode(inputMode: boolean) {
    this.inputMode = inputMode;
    this.mainGiveButtonDisabled = !(this.inputMode && SetupDonationComponent.isValidCustomAmount(this.customAmount));
  }

  saveCustomAmount(customAmount: number) {
    this.customAmount = customAmount;
    this.mainGiveButtonDisabled = !SetupDonationComponent.isValidCustomAmount(this.customAmount);
  }


  private static isValidCustomAmount(amount: number): boolean {
    return amount >= .5 && amount <= 25000;
  }
}
