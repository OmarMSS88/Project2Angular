import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = environment.api_url; // Update to the actual API URL

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  createOffer(offer: Offer): Observable<Offer> {
    return this.auth.user$.pipe(
      switchMap(user => {
        const userId = user?.sub;
        return this.httpClient.post<Offer>(this.apiUrl, { ...offer, userId });
      })
    );
  }

  getOffers(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(`${this.apiUrl}/offer`);
  }

  getOfferById(id: number): Observable<Offer> {
    return this.httpClient.get<Offer>(`${this.apiUrl}/offer/${id}`);
  }

  getOffersByUser(userId: string): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(`${this.apiUrl}/offer/user/${userId}`);
  }

  updateOffer(id: number, offer: Offer): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/offer/${id}`, offer);
  }

  deleteOffer(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/offer/${id}`);
  }
}
