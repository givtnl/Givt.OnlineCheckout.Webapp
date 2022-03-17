import {Component, Input, OnInit} from '@angular/core';
import {AmountData, DATA} from "../model/organisation";

@Component({
  selector: 'app-amounts',
  templateUrl: './amounts.component.html',
  styleUrls: ['./amounts.component.css']
})
export class AmountsComponent implements OnInit {
  @Input()
  values: AmountData[] = [];
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
