import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateOfferDto } from '../dto/update-offer.dto';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'] // Corrected to 'styleUrls'
})

export class OfferFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  offerId: number = 1;

  offer: Offer = { id: 0, title: "", offerTypeId: 0, offerType: { id: 0, name: ""}, description: "", userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: ""};

  isSubmitted: boolean = false;
  errorMessage: string = "";

  offer$: Subscription = new Subscription();
  postOffer$: Subscription = new Subscription();
  putOffer$: Subscription = new Subscription();

  constructor(private router: Router, private offerService: OfferService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.offerId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.offerId != null && this.offerId > 0) {
      this.offer$ = this.offerService.getOfferById(this.offerId).subscribe(result => this.offer = result);
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

    // Prepare the object according to DTO
    const updateOfferDto: UpdateOfferDto = {
      id: this.offer.id,
      title: this.offer.title,
      description: this.offer.description,
      offerTypeId: this.offer.offerTypeId
    };

    if (this.isAdd) {
      this.postOffer$ = this.offerService.createOffer(this.offer).subscribe({
        next: (v) => this.router.navigateByUrl('/myoffers'),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.putOffer$ = this.offerService.updateOffer(this.offerId, updateOfferDto).subscribe({
        next: (v) => this.router.navigateByUrl('/myoffers'),
        error: (e) => this.errorMessage = e.message
      });
    }
  }
}
