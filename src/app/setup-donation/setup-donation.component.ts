import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AmountData, DATA, Organisation} from "./model/organisation";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {

  organisation: Organisation;
  currentSelected = new AmountData(0,0,);
  inputMode = false;
  customAmount = 0;

  mainGiveButtonDisabled = true;

  constructor(private router: Router, private http: HttpClient) {
    this.organisation = DATA[0];
  }

  ngOnInit(): void {
    this.http
      .get('http://localhost:5000/api/medium?mediumid=61f7ed014e4c0121c005.c00000000001')
      .subscribe(responseData => {
        // @ts-ignore
        this.organisation.amounts = AmountData.fromAmounts(responseData['amounts'])
        // @ts-ignore
        this.organisation.name = responseData['organisationName']
        // @ts-ignore
        this.organisation.goal = responseData['goal']
      })
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
