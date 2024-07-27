import { Injectable } from '@angular/core';
import { Offer } from './offer';

import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offers: Offer[] = [];
  constructor(private httpClient: HttpClient) {
    
   }

  getOffers(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:3000/offers");
  }

  getOfferById(id: number) : Observable<Offer> {
    return timer(1, 3000).pipe(switchMap(() => this.httpClient.get<Offer>("http://localhost:3000/offers/" + id)));
  }
}
