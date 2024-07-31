import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/offer';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { OfferComponent } from '../offer/offer.component';

@Component({
  selector: 'app-my-offers',
  standalone: true,
  imports: [CommonModule, RouterModule, OfferComponent],
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  offers$: Subscription = new Subscription();
  deleteOffer$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private offerService: OfferService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMyOffers();
  }

  ngOnDestroy(): void {
    this.offers$.unsubscribe();
    this.deleteOffer$.unsubscribe();
  }

  getMyOffers() {
    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        this.offers$ = this.offerService.getOffersByUser(user.sub).subscribe({
          next: (result) => this.offers = result,
          error: (e) => this.errorMessage = e.message
        });
      }
    });
  }

  // Ensure that id is always a number when passed to editOffer and deleteOffer methods
editOffer(id: number) {
  if (!isNaN(id)) {
    this.router.navigate(['/offer/form'], { state: { id: id, mode: 'edit' } });
  } else {
    console.error('Invalid ID for edit:', id);
  }
}

deleteOffer(id: number) {
  if (id) {
    this.deleteOffer$ = this.offerService.deleteOffer(id).subscribe({
      next: () => this.getMyOffers(),
      error: (e) => this.errorMessage = e.message
    });
  }
}
}
