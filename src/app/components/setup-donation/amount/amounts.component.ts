import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {AmountData, Currency} from "../../../models/models";
import {getCurrencySymbol} from "../../../models/models";

@Component({
  selector: 'app-amounts',
  templateUrl: './amounts.component.html',
  styleUrls: ['./amounts.component.css']
})
export class AmountsComponent implements OnInit {
  @Input()
  values: AmountData[] = []
  @Input()
  currency: Currency = 0;
  currencySymbol: string = '€'
  @Output()
  presetClicked = new EventEmitter<AmountData>()
  customAmountInputShown: boolean = false
  @Output()
  inputModeChanged = new EventEmitter<boolean>()
  @Output()
  amountChanged = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
    this.currencySymbol = getCurrencySymbol(this.currency)
  }

  itemClickedEvent(id: number, value: number) {
    this.presetClicked.emit(new AmountData(id,value,));
  }

  closeAmount() {
    this.customAmountInputShown = false
    this.inputModeChanged.emit(this.customAmountInputShown)
  }

  toggleAmount() {
    this.customAmountInputShown = !this.customAmountInputShown
    this.inputModeChanged.emit(this.customAmountInputShown)
  }

  sendAmount(event: any) {
    this.amountChanged.emit(event.target.value);
  }
}
