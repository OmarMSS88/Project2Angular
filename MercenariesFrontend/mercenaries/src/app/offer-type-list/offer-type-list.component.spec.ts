import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTypeListComponent } from './offer-type-list.component';

describe('CategoryListComponent', () => {
  let component: OfferTypeListComponent;
  let fixture: ComponentFixture<OfferTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
