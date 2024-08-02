import { Component, Input } from '@angular/core';
import { Offer } from '../models/offer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShortenContentPipe } from '../shorten-content.pipe';
import { CustomDatePipe } from '../custom-date.pipe';

@Component({
  selector: 'app-offer-guest',
  standalone: true,
  imports: [CommonModule, ShortenContentPipe, CustomDatePipe],
  templateUrl: './offer-guest.component.html',
  styleUrls: ['./offer-guest.component.css']
})
export class OfferGuestComponent {
  @Input() offer: Offer = { id: 0, title: "", offerTypeId: 0, offerType: { id: 0, name: ""}, description: "", userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: ""};
  @Input() isDetail: boolean = false;

  constructor(private router: Router) {}

  detail(id: number) {
    this.router.navigate(['/offerguest', id]);
  }
}
