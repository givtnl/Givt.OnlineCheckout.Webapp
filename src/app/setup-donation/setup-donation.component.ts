import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-setup-donation',
  templateUrl: './setup-donation.component.html',
  styleUrls: ['./setup-donation.component.css']
})
export class SetupDonationComponent implements OnInit {
  constructor(private router: Router) { }


  ngOnInit(): void {

  }

  submit() {
    this.router.navigate(['/payment'])
  }
}
