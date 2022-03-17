import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {AmountData} from "../../../models/organisation";

@Component({
  selector: 'app-amounts',
  templateUrl: './amounts.component.html',
  styleUrls: ['./amounts.component.css']
})
export class AmountsComponent implements OnInit {
  @Input()
  values: AmountData[] = []
  @Output()
  presetClicked = new EventEmitter<AmountData>()
  customAmountInputShown: boolean = false
  @Output()
  inputModeChanged = new EventEmitter<boolean>()
  @Output()
  amountChanged = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
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
