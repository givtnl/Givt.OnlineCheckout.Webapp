import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.css']
})
export class AmountComponent implements OnInit {

  amountShown: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  closeAmount() {
    this.amountShown = false
  }

  toggleAmount() {
    this.amountShown = !this.amountShown
  }

}
