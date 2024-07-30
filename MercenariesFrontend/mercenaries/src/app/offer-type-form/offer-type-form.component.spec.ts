import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTypeFormComponent } from './offer-type-form.component';

describe('OfferTypeFormComponent', () => {
  let component: OfferTypeFormComponent;
  let fixture: ComponentFixture<OfferTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
