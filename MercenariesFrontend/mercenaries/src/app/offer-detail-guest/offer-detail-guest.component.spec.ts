import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailGuestComponent } from './offer-detail-guest.component';

describe('OfferDetailGuestComponent', () => {
  let component: OfferDetailGuestComponent;
  let fixture: ComponentFixture<OfferDetailGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferDetailGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferDetailGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
