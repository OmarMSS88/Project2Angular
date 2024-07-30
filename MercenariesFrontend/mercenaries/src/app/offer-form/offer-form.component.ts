import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  offerId: number = 0;

  offer: Offer = { id: 0, title: "", offerTypeId: 0, offerType: { id: 0, name: ""}, description: "", userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: ""};

  isSubmitted: boolean = false;
  errorMessage: string = '';

  offer$: Subscription = new Subscription();
  postOffer$: Subscription = new Subscription();
  putOffer$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private offerService: OfferService
  ) {
    // Use 'nullish coalescing operator' to handle undefined or null values
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.isAdd = navigation.extras.state['mode'] === 'add';
      this.isEdit = navigation.extras.state['mode'] === 'edit';
      this.offerId = Number(navigation.extras.state['id']); // Convert to number
  
      if (isNaN(this.offerId)) {
        console.error('Invalid offerId:', this.offerId);
      }
  
      if (this.isEdit && this.offerId > 0) {
        this.offer$ = this.offerService.getOfferById(this.offerId).subscribe({
          next: (result) => this.offer = result,
          error: (e) => this.errorMessage = e.message
        });
      }
    } else {
      console.error('No navigation extras found');
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.offer$.unsubscribe();
    this.postOffer$.unsubscribe();
    this.putOffer$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postOffer$ = this.offerService.createOffer(this.offer).subscribe({
        next: () => this.router.navigateByUrl('/my-offers'),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.putOffer$ = this.offerService.updateOffer(this.offerId, this.offer).subscribe({
        next: () => this.router.navigateByUrl('/my-offers'),
        error: (e) => this.errorMessage = e.message
      });
    }
  }
}
