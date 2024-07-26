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
  offer: Offer = { id: 0, title: "", subtitle: "", imageUrl: "", imageCaption: "", content: "", author: "", publishDate: "", categoryId: 0 };

  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId != null) {
      this.offerService.getOfferById(+offerId).subscribe(result => this.offer = result);
    }
  }
}