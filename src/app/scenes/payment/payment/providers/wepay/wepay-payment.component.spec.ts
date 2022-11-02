import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WepayPaymentComponent } from './wepay-payment.component';

describe('WepayPaymentComponent', () => {
  let component: WepayPaymentComponent;
  let fixture: ComponentFixture<WepayPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WepayPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WepayPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
