import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DATA, Organisation} from "./model/organisation";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {
  organisation: Organisation;
  constructor(private router: Router) {
    this.organisation = DATA[0];
    console.log(this.organisation.amounts)
  }

  ngOnInit(): void {
    
  }

  submit() {
    this.router.navigate(['/payment'])
  }
}
