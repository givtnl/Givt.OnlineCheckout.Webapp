import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WepayDonationComponent } from './wepay-donation.component';

describe('WepayDonationComponent', () => {
  let component: WepayDonationComponent;
  let fixture: ComponentFixture<WepayDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WepayDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WepayDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
