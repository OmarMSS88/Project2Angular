import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Offer } from '../models/offer';
import { OfferGuestService } from '../services/offerguest.service';
import { ActivatedRoute } from '@angular/router';
import { CustomDatePipe } from '../custom-date.pipe';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offer-detail-guest',
  standalone: true,
  imports: [CommonModule, CustomDatePipe],
  templateUrl: './offer-detail-guest.component.html',
  styleUrls: ['./offer-detail-guest.component.css']
})
export class OfferDetailGuestComponent implements OnInit {
  offer: Offer = { id: 0, title: "", offerTypeId: 0, offerType: { id: 0, name: ""}, description: "", userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: ""};

  constructor(private offerService: OfferService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId != null) {
      this.offerService.getOfferById(+offerId).subscribe(result => this.offer = result);
    }
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }
}
