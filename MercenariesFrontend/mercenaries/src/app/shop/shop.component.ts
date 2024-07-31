import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/offer';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OfferComponent } from '../offer/offer.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, OfferComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  offers$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(private offerService: OfferService, private router: Router) {}

  ngOnInit(): void {
    this.getOffers();
  }

  ngOnDestroy(): void {
    this.offers$.unsubscribe();
  }

  getOffers() {
    this.offers$ = this.offerService.getOffers().subscribe({
      next: (result) => this.offers = result,
      error: (e) => this.errorMessage = e.message
    });
  }

  detail(id: number) {
    this.router.navigate(['/offer', id]);
  }
}
