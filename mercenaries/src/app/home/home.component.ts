import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
import { OfferComponent } from '../offer/offer.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OfferComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  offers$: Observable<Offer[]> = new Observable<Offer[]>();

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offers$ = this.offerService.getOffers();
  }
}
