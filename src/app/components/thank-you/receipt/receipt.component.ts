import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  emailShown: boolean = false;
  @Output()
  emailShownChanged = new EventEmitter<boolean>()

  @Output()
  emailChanged = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  toggleEmail() {
    this.emailShown = !this.emailShown
    this.emailShownChanged.emit(this.emailShown)
  }

  emailChangedListener(event: any) {
    this.emailChanged.emit(event.target.value)
  }
}
