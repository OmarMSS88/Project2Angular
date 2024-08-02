import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferGuestService } from '../services/offerguest.service';
import { Offer } from '../models/offer';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OfferGuestComponent } from '../offer-guest/offer-guest.component';
import { OfferType } from '../models/offer-type';
import { OfferTypeService } from '../services/offer-type.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-guest',
  standalone: true,
  imports: [CommonModule, RouterModule, OfferGuestComponent, FormsModule],
  templateUrl: './shop-guest.component.html',
  styleUrls: ['./shop-guest.component.css']
})
export class ShopGuestComponent implements OnInit {
  offers: Offer[] = [];
  filteredOffers: Offer[] = [];
  offerTypes: OfferType[] = [];
  errorMessage: string = '';
  titleFilter: string = '';
  offerTypeFilter: string = '';

  constructor(
    private offerService: OfferGuestService,
    private offerTypeService: OfferTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerService.getOffers().subscribe({
      next: (result) => {
        this.offers = result;
        this.filteredOffers = this.offers;
      },
      error: (e) => this.errorMessage = e.message
    });

    this.getOfferTypes();
  }

  getOfferTypes() {
    this.offerTypeService.getOfferTypes().subscribe({
      next: (result) => this.offerTypes = result,
      error: (e) => this.errorMessage = e.message
    });
  }

  applyFilters() {
    this.filteredOffers = this.offers.filter(offer =>
      (this.titleFilter ? offer.title.toLowerCase().includes(this.titleFilter.toLowerCase()) : true) &&
      (this.offerTypeFilter ? offer.offerTypeId === +this.offerTypeFilter : true)
    );
  }

  detail(id: number) {
    this.router.navigate(['/offerguest', id], { queryParams: {isGuest: true}});
  }
}
