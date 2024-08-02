import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { OfferTypeService } from '../services/offer-type.service';
import { OfferType } from '../models/offer-type';
import { UpdateOfferDto } from '../dto/update-offer.dto';
import { CreateOfferDto } from '../dto/create-offer';
import { AuthService } from '@auth0/auth0-angular'; // Auth0 service for user authentication

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
  offerId: number = 1;

  offer: Offer = { 
    id: 0, 
    title: "", 
    offerTypeId: 0, 
    offerType: { id: 0, name: ""}, 
    description: "", 
    userId: 0, 
    user: { id: 0, auth0UserId: "", email: "", fullName: ""}, 
    publishDate: "" 
  };

  offerTypes: OfferType[] = [];
  isSubmitted: boolean = false;
  errorMessage: string = "";

  offer$: Subscription = new Subscription();
  postOffer$: Subscription = new Subscription();
  putOffer$: Subscription = new Subscription();
  offerTypes$: Subscription = new Subscription();

  constructor(
    private router: Router, 
    private offerService: OfferService,
    private offerTypeService: OfferTypeService,
    private auth: AuthService // Inject Auth0 service for user authentication
  ) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.offerId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.offerId != null && this.offerId > 0) {
      this.offer$ = this.offerService.getOfferById(this.offerId).subscribe(result => this.offer = result);
    }

    this.offerTypes$ = this.offerTypeService.getOfferTypes().subscribe({
      next: (types) => this.offerTypes = types,
      error: (e) => this.errorMessage = e.message
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.offer$.unsubscribe();
    this.postOffer$.unsubscribe();
    this.putOffer$.unsubscribe();
    this.offerTypes$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;

    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        if (this.isAdd) {
          const createOfferDto: CreateOfferDto = {
            title: this.offer.title,
            description: this.offer.description,
            offerTypeId: this.offer.offerTypeId,
            userId: user.sub, // Set the user ID
            publishDate: new Date() // Set the current date and time as the publishing date
          };

          this.postOffer$ = this.offerService.createOffer(createOfferDto).subscribe({
            next: () => this.router.navigateByUrl('/myoffers'),
            error: (e) => this.errorMessage = e.message
          });
        }

        if (this.isEdit) {
          const updateOfferDto: UpdateOfferDto = {
            id: this.offer.id,
            title: this.offer.title,
            description: this.offer.description,
            offerTypeId: this.offer.offerTypeId
          };

          this.putOffer$ = this.offerService.updateOffer(this.offerId, updateOfferDto).subscribe({
            next: () => this.router.navigateByUrl('/myoffers'),
            error: (e) => this.errorMessage = e.message
          });
        }
      }
    });
  }
}
