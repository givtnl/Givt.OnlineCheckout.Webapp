import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  userWantsReceipt = false;
  email = '';
  continueButtonDisabled = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeBackdrop() {
    this.userWantsReceipt=false;
    this.email = "";
  }

  saveEmail(event: string) {
    this.email = event;
    //!ThankYouComponent.isValidEmail(this.email);
  }

  determineDisabledPropForContinueButton(event: boolean) {
    this.userWantsReceipt = event
    /*if (event) {
      if (!SetupDonationComponent.isValidEmail(this.email)) {
        this.continueButtonDisabled = true
      } else {
        this.continueButtonDisabled = false
      }
    } else {
      this.continueButtonDisabled = false
    }*/
  }

  submitEmail() {
    localStorage.setItem('taxReport', String(this.userWantsReceipt));
    localStorage.setItem('email', this.email!.trim());
  }

    sendEmail($event: string) {
        this.userWantsReceipt = false
    }
}
