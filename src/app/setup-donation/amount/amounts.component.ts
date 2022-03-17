import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {AmountData} from "../model/organisation";

@Component({
  selector: 'app-amounts',
  templateUrl: './amounts.component.html',
  styleUrls: ['./amounts.component.css']
})
export class AmountsComponent implements OnInit {
  @Input()
  values: AmountData[] = []
  @Output()
  PresetClickedEventEmitter = new EventEmitter<AmountData>()


  customAmountInputShown: boolean = false
  @Output()
  InputModeEventEmitter = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  itemClickedEvent(id: number, value: number) {
    this.PresetClickedEventEmitter.emit(new AmountData(id,value,));
  }

  closeAmount() {
    this.customAmountInputShown = false
    this.InputModeEventEmitter.emit(this.customAmountInputShown)
  }

  toggleAmount() {
    this.customAmountInputShown = !this.customAmountInputShown
    this.InputModeEventEmitter.emit(this.customAmountInputShown)
  }
}
