import {Component, Input, OnInit, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {AmountData, PaymentMethodTile} from "../../../models/models";
import {getCurrencySymbol} from "../../../models/models";

@Component({
  selector: 'app-amounts',
  templateUrl: './amounts.component.html',
  styleUrls: ['./amounts.component.css']
})
export class AmountsComponent implements OnInit, AfterViewInit {
  @Input()
  values: AmountData[] = []
  @Input()
  currency: string = 'EUR';
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
    this.itemClickedEvent(this.values[1].id, this.values[1].value)
  }

  ngAfterViewInit(): void {
    (document.getElementById('1') as HTMLInputElement).checked = true;
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
    if (this.customAmountInputShown) {
      document.getElementsByClassName('presets-title').item(0)!.innerHTML = "anything is good, really"
    }
    this.inputModeChanged.emit(this.customAmountInputShown)
  }

  sendAmount(event: any) {
    this.amountChanged.emit(event.target.value);
  }
}
