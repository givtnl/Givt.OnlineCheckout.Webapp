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
        amount = this.customAmount
      } else {
        amount = this.currentSelected.value
      }

      localStorage.setItem('amount', String(amount));
      await this.router.navigate(['/payment'])
    }
    this.mainGiveButtonDisabled = false
  }

  setCurrentSelected(event: AmountData) {
    this.currentSelected = event;
    this.mainGiveButtonDisabled = false;
  }

  setInputMode(inputMode: boolean) {
    this.inputMode = inputMode;
    this.mainGiveButtonDisabled = !(this.inputMode && this.customAmount > 0);
  }

  saveCustomAmount(customAmount: number) {
    this.customAmount = customAmount;
    this.mainGiveButtonDisabled = this.customAmount <= 0;
  }
}
