import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {
  constructor(private router: Router) { }
  amountShown: boolean = false;
  emailShown: boolean = false;

  ngOnInit(): void {

  }

  submit() {
    this.router.navigate(['/payment'])
  }

  toggleAmount() {
    this.amountShown = !this.amountShown
  }

  toggleEmail() {
    this.emailShown = !this.emailShown
  }

  closeAmount() {
    this.amountShown = false
  }
}
