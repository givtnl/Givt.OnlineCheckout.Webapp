import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  emailShown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleEmail() {
    this.emailShown = !this.emailShown
  }
}
