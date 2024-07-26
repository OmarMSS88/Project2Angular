import { Component } from '@angular/core';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
import { OfferComponent } from '../offer/offer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OfferComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  offers: Offer[] = [];

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offers = this.offerService.getOffers();
  }
}
