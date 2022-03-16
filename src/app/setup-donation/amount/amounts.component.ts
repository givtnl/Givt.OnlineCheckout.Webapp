import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amounts.component.html',
  styleUrls: ['./amounts.component.css']
})
export class AmountsComponent implements OnInit {
  AMOUNTS = [
    {id: 1, value: 6},
    {id: 2, value: 10},
    {id: 3, value: 15},
  ]
  customAmountInputShown: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  closeAmount() {
    this.customAmountInputShown = false
  }

  toggleAmount() {
    this.customAmountInputShown = !this.customAmountInputShown
  }
}
