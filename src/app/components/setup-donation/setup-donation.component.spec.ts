import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDonationComponent } from './setup-donation.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {AmountData, IncomingOrganisation} from "../../models/models";
import {AmountsComponent} from "./amount/amounts.component";
import { asNativeElements, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SetupDonationComponent', () => {
  let component: SetupDonationComponent;
  let fixture: ComponentFixture<SetupDonationComponent>;
  let elem: HTMLButtonElement;
  let debugel: DebugElement;


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
                organisation: new IncomingOrganisation([1,2,3], "goal", "medium", "name", "ty", "EUR")
              }
            }
          },
        },
        {
          provide: AmountsComponent,
          useValue: {
            values: [new AmountData(1,5), new AmountData(2, 7)],
            currency: "EUR"
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
  
  it('should disable mainGiveButton when no amount was selected/chosen', () => {
    const fixture = TestBed.createComponent(SetupDonationComponent);
    fixture.detectChanges();
    expect(component.mainGiveButtonDisabled).toBe(true);
    //fixture.submit();

  });

  it('should disable mainGiveButton when no amount was selected/chosen', () => {
    const fixture = TestBed.createComponent(SetupDonationComponent);
    fixture.componentInstance.mainGiveButtonDisabled = true
    fixture.detectChanges();
    debugel = fixture.debugElement.query(By.css('.donate-button'));
    elem = debugel.nativeElement;
        expect(elem.disabled).toBe(true);
    fixture.componentInstance.mainGiveButtonDisabled = false
    fixture.detectChanges();
    elem = debugel.nativeElement;
        expect(elem.disabled).toBe(false);
    
  });

});
