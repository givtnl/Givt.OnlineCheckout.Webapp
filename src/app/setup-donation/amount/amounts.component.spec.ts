import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountsComponent } from './amounts.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
