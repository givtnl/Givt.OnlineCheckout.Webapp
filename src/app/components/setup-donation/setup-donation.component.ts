import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AmountData, DATA, IncomingOrganisation} from "../../models/organisation";
import {OrganisationsService} from '../../services/organisations.service'

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css'],
  providers: [OrganisationsService]
})
export class SetupDonationComponent implements OnInit {
  organisation = DATA[0];
  currentSelected = new AmountData(0,0,);
  inputMode = false;
  customAmount = 0;
  mainGiveButtonDisabled = true;
  code: string = '';


  constructor(private router: Router, private orgService: OrganisationsService) { }

  ngOnInit(): void {
    this.orgService.getByMediumId('61f7ed014e4c0121c005.c00000000001').subscribe(responseData => {
      const organisation: IncomingOrganisation = responseData as IncomingOrganisation;
      this.organisation.name = organisation.organisationName;
      this.organisation.goal = organisation.goal;
      this.organisation.thamkYou = organisation.thankYou
      this.organisation.amounts = AmountData.fromAmounts(organisation.amounts)
    })
  }

  async submit() {
    if (this.currentSelected.id === 0 && (this.inputMode && this.customAmount === 0)) {
      return
    } else {
      let amount = 0;
      if (this.inputMode) {
        amount = this.customAmount
      } else {
        amount = this.currentSelected.value
      }
      let paymentMethodId = "";
      //this.code = await this.orgService.postDonation(amount)
      //console.log(this.code)
      //this.router.navigate(['/payment'])
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
