import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDonationComponent } from './setup-donation.component';

describe('SetupDonationComponent', () => {
  let component: SetupDonationComponent;
  let fixture: ComponentFixture<SetupDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
