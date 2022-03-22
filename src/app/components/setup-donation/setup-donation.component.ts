import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AmountData, DATA, Organisation} from "../../models/models";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {
  organisation = DATA[0];
  currentSelected = new AmountData(0,0,);
  inputMode = false;
  customAmount = 0;
  mainGiveButtonDisabled = true;
  continueButtonDisabled = false;
  email = '';
  given = false;

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
        amount = Math.round(this.customAmount * 100) / 100
        if (!SetupDonationComponent.isValidCustomAmount(amount)) {
          return
        }
      } else {
        amount = this.currentSelected.value
      }

      localStorage.setItem('amount', String(amount));
      this.given = true;
    }
  }

  async submitEmail() {
    localStorage.setItem('email', this.email);
    await this.router.navigate(['/payment'])
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

  saveEmail(event: string) {
    this.email = event;
    this.continueButtonDisabled = !SetupDonationComponent.isValidEmail(this.email);
  }

  determineDisabledPropForContinueButton(event: boolean) {
    if (event) {
      if (!SetupDonationComponent.isValidEmail(this.email)) {
        this.continueButtonDisabled = true
      } else {
        this.continueButtonDisabled = false
      }
    } else {
      this.continueButtonDisabled = false
    }
  }

  private static isValidCustomAmount(amount: number): boolean {
    return amount >= .25 && amount <= 25000;
  }

  private static isValidEmail(email: string): boolean {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email)
  }
}
