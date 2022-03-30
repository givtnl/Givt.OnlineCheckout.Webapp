import {ComponentFixture, TestBed} from '@angular/core/testing';
import AmountData from 'src/app/shared/models/donations/amount-data';

import {AmountsComponent} from './amounts.component';

describe('AmountComponent', () => {
  let component: AmountsComponent;
  let fixture: ComponentFixture<AmountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountsComponent);
    component = fixture.componentInstance;
    component.values = [new AmountData(1,5), new AmountData(2,10), new AmountData(3,15)];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should convert input currency enum to the string symbol', () => {
      expect(component.currencySymbol).toEqual('€')
  })
});
