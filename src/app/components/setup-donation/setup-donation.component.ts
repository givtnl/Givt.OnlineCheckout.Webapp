import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AmountData, DATA} from "../../models/organisation";
import {OrganisationsService, PaymentMethodId} from '../../services/organisations.service'

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
  paymentMethodId = '';


  constructor(private router: Router, private orgService: OrganisationsService) { }

  ngOnInit(): void {
    this.orgService.getByMediumId('61f7ed014e4c0121c005.c00000000001').then((incomingOrg) => {
      this.organisation.name = incomingOrg.organisationName;
      this.organisation.goal = incomingOrg.goal;
      this.organisation.thamkYou = incomingOrg.thankYou
      this.organisation.amounts = AmountData.fromAmounts(incomingOrg.amounts)
    })
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
      await this.orgService.postDonation(amount).then((incomingPaymentMethodId: PaymentMethodId) => {
        this.paymentMethodId = incomingPaymentMethodId.paymentMethodId
      })
      await this.router.navigate(['/payment'], {queryParams: {'paymentMethodId': this.paymentMethodId}})
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
