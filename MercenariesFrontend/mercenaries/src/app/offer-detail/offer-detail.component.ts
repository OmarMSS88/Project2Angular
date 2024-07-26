import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
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
  offer: Offer = { id: 0, title: "", subtitle: "", imageUrl: "", imageCaption: "", content: "", author: "", publishDate: "" };

  constructor(private offerservice: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId != null) {
      let offerTemp = this.offerservice.getOfferById(+offerId) ?? null;
      if (offerTemp != null) {
        this.offer = offerTemp;
      }
    }
  }
}