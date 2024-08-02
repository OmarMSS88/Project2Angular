import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/offer';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OfferComponent } from '../offer/offer.component';
import { AuthService } from '@auth0/auth0-angular';
import { OfferType } from '../models/offer-type';
import { OfferTypeService } from '../services/offer-type.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, OfferComponent, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  filteredOffers: Offer[] = [];
  offers$: Subscription = new Subscription();
  offerTypes: OfferType[] = [];
  errorMessage: string = '';
  titleFilter: string = '';
  offerTypeFilter: string = '';
  userId: string | null = null;

  constructor(
    private offerService: OfferService, 
    private offerTypeService: OfferTypeService, 
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch offers regardless of the authentication status
    this.offerService.getOffers().pipe(
      catchError(error => {
        this.errorMessage = 'Error fetching offers';
        return of([]); // Return an empty array on error
      })
    ).subscribe(result => {
      // If a user is authenticated, filter out offers by the currently logged-in user
      this.authService.user$.subscribe(user => {
        this.userId = user?.sub || null;
  
        // Apply filtering based on user authentication status
        this.offers = this.userId ? result.filter(offer => offer.user.auth0UserId !== this.userId) : result;
        this.filteredOffers = this.offers;
      });
    });
  
    // Fetch offer types regardless of the authentication status
    this.getOfferTypes();
  }

  ngOnDestroy(): void {
    this.offers$.unsubscribe();
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
    this.router.navigate(['/offer', id], { queryParams: {isGuest: true}});
  }
}
