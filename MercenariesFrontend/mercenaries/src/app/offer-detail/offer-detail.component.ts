import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { OfferComponent } from '../offer/offer.component';

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [CommonModule, OfferComponent],
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer = { id: 0, title: "", offerTypeId: 0, offerType: { id: 0, name: ""}, description: "", userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: ""};

  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId != null) {
      this.offerService.getOfferById(+offerId).subscribe(result => this.offer = result);
    }
  }
}