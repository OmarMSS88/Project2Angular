import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferType } from '../models/offer-type';
import { Offer } from '../models/offer';

@Injectable({
    providedIn: 'root'
})
export class OfferTypeService {

    constructor(private httpClient: HttpClient) { }

    getCategories(): Observable<OfferType[]> {
        return this.httpClient.get<OfferType[]>("https://localhost:6587/api/OfferType");
    }

    getCategoryById(id: number): Observable<OfferType> {
        return this.httpClient.get<OfferType>("https://localhost:6587/api/OfferType/" + id);
    }

    postCategory(category: OfferType): Observable<OfferType> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.post<OfferType>("https://localhost:6587/api/OfferType", category, {headers: headers});
    }

    putCategory(id:number, category: OfferType): Observable<OfferType> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.put<OfferType>("https://localhost:6587/api/OfferType/" + id, category, {headers: headers});
    }

    deleteCategory(id: number): Observable<OfferType> {
        return this.httpClient.delete<OfferType>("https://localhost:6587/api/OfferType/" + id);
    }
}