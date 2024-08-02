import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferGuestComponent } from './offer-guest.component';

describe('OfferGuestComponent', () => {
  let component: OfferGuestComponent;
  let fixture: ComponentFixture<OfferGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
