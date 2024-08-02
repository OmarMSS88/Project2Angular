import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { CustomDatePipe } from '../custom-date.pipe';

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [CommonModule, CustomDatePipe],
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer = { id: 0, title: "", offerTypeId: 0, offerType: { id: 0, name: ""}, description: "", userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: ""};
  
  @Input() isGuest: boolean = false; // Flag to determine if the view is for a guest

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

  bookOffer(): void {
    // Implement the logic to book the offer
    console.log('Offer booked!');
  }
}
