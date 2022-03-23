import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDonationComponent } from './setup-donation.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {AmountData, Currency, IncomingOrganisation} from "../../models/models";
import {AmountsComponent} from "./amount/amounts.component";

describe('SetupDonationComponent', () => {
  let component: SetupDonationComponent;
  let fixture: ComponentFixture<SetupDonationComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupDonationComponent ],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                organisation: new IncomingOrganisation([1,2,3], "goal", "medium", "name", "ty", 1)
              }
            }
          },
        },
        {
          provide: AmountsComponent,
          useValue: {
            values: [new AmountData(1,5), new AmountData(2, 7)],
            currency: Currency.EUR
          }
        }
      ]

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

  it('should render title', () => {
    const fixture = TestBed.createComponent(SetupDonationComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Give to');
  });
});
