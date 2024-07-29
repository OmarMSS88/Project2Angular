import { Injectable } from '@angular/core';
import { Offer } from './models/offer';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient: HttpClient) {
  }

  getOffers(): Observable<Offer[]> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Offer[]>("http://localhost:3000/offers")));
  }

  getOffersById(id: number): Observable<Offer> {
    return this.httpClient.get<Offer>("http://localhost:3000/offers/" + id);
  }
}
