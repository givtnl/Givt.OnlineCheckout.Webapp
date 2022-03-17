import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AmountData, DATA, Organisation} from "./model/organisation";
import {AmountsComponent} from "./amount/amounts.component";
import {$e} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {

  organisation: Organisation;
  currentSelected: AmountData;
  inputMode: boolean;
  customAmount: number;

  mainGiveButtonDisabled = true;

  constructor(private router: Router) {
    this.organisation = DATA[0];
    this.currentSelected = new AmountData(0,0,);
    this.inputMode = false
    this.customAmount = 0
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.currentSelected.id === 0 && (this.inputMode && this.customAmount === 0)) {
      return
    } else {
      if (this.inputMode) {
        console.log(this.customAmount)
      } else {
        console.log(this.currentSelected.value)
      }
    }
    //this.router.navigate(['/payment'])
  }

  setCurrentSelected(event: AmountData) {
    this.currentSelected = event;
    this.mainGiveButtonDisabled = false;
  }

  setInputMode(inputMode: boolean) {
    this.inputMode = inputMode;
    if (this.inputMode && this.customAmount > 0) {
      this.mainGiveButtonDisabled = false
    } else {
      this.mainGiveButtonDisabled = true;
    }
  }

  saveCustomAmount(customAmount: number) {
    this.customAmount = customAmount;
    if (this.customAmount > 0) {
      this.mainGiveButtonDisabled = false;
    } else {
      this.mainGiveButtonDisabled = true;
    }
  }
}
