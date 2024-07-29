import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'https://localhost:6587/api'; // Update to the actual API URL

  constructor(private httpClient: HttpClient) {}

  getOffers(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(`${this.apiUrl}/offer`);
  }

  getOfferById(id: number): Observable<Offer> {
    return this.httpClient.get<Offer>(`${this.apiUrl}/offer/${id}`);
  }
}
