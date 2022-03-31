import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  public emailForm!: FormGroup;
  emailShown: boolean = false;
  @Output()
  emailShownChanged = new EventEmitter<boolean>()

  @Output()
  emailChanged = new EventEmitter<string>()

  constructor(private formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ''
    })
  }

  toggleEmail() {
    this.emailShown = !this.emailShown
    this.emailShownChanged.emit(this.emailShown)
  }

  emailChangedListener(event: any) {
    this.emailChanged.emit(event.target.value)
  }
}