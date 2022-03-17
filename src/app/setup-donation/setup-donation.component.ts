import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AmountData, DATA, Organisation} from "./model/organisation";
import {AmountsComponent} from "./amount/amounts.component";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {
  organisation: Organisation;
  currentSelected: AmountData;
  inputMode: boolean
  constructor(private router: Router) {
    this.organisation = DATA[0];
    this.currentSelected = new AmountData(0,0,);
    this.inputMode = false
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.currentSelected.id === 0) {
      return
    } else {
      if (this.inputMode) {
        console.log("custom amount")
      } else {
        console.log(this.currentSelected.value)
      }
    }
    //this.router.navigate(['/payment'])
  }

  setCurrentSelected(event: AmountData) {
    this.currentSelected = event;
  }

  setInputMode($event: boolean) {
    this.inputMode = $event;
  }
}
