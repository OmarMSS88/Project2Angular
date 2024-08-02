import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UpdateOfferDto } from '../dto/update-offer.dto';
import { CreateOfferDto } from '../dto/create-offer';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferGuestService {
  private apiUrl = environment.api_url; // Update to the actual API URL

  constructor(private httpClient: HttpClient) { }


  getOffers(): Observable<Offer[]> {
    console.log("zover")
    return this.httpClient.get<Offer[]>(`${this.apiUrl}/offer`).pipe(
      catchError(error => {
        // Handle errors
        console.error('Error fetching offers:', error);
        return throwError(() => error);
      })
    );
  }
}
