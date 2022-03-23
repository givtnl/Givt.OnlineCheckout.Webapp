import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDonationComponent } from './setup-donation.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {IncomingOrganisation} from "../../models/models";

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
});
