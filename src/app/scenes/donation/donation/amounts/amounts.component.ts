import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyHelper } from 'src/app/shared/helpers/currency-helper';
import AmountData from 'src/app/shared/models/donations/amount-data';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-amounts',
  templateUrl: './amounts.component.html',
  styleUrls: ['./amounts.component.scss'],
    animations: [
        trigger('customAmountInputShownState', [
            state('not-shown', style({
                display: 'none',
                opacity: 0
            })),
            state('shown', style({
                display: 'block',
                opacity: 1
            })),
            transition('shown => not-shown', [style({display: 'block', opacity: 1}), animate('.15s', style({display: 'block', opacity: 0}))]),
            transition('not-shown => shown', [style({display: 'block'}), animate('0s .15s', style({display: 'block', opacity: 0})), animate('.15s', style({display: 'block', opacity: 1}))]),
        ])
    ]
})
export class AmountsComponent implements OnInit, AfterViewInit {
  @Input()
  values: AmountData[] = []
  @Input()
  currency: string = 'EUR';
  currencySymbol: string = '€'
  @Output()
  onPresetClick = new EventEmitter<AmountData>()
  customAmountInputShown: boolean = false
  @Output()
  onInputModeChange = new EventEmitter<boolean>()
  @Output()
  onAmountChange = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
    this.currencySymbol = CurrencyHelper.getCurrencySymbol(this.currency)
    this.itemClickedEvent(this.values[1].id, this.values[1].value)
  }

  ngAfterViewInit(): void {
    (document.getElementById('1') as HTMLInputElement).checked = true;
  }

  itemClickedEvent(id: number, value: number) {
    this.onPresetClick.emit(new AmountData(id,value,));
  }

  closeAmount() {
    this.customAmountInputShown = false
    this.onInputModeChange.emit(this.customAmountInputShown)
  }

  toggleAmount() {
    this.customAmountInputShown = !this.customAmountInputShown
    this.onInputModeChange.emit(this.customAmountInputShown)
  }

  sendAmount(event: any) {
    this.onAmountChange.emit(event.target.value);
  }
}
