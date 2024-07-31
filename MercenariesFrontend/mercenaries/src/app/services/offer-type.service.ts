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

    getOfferTypes(): Observable<OfferType[]> {
        return this.httpClient.get<OfferType[]>("https://localhost:6587/api/OfferType");
    }

    getOfferTypesById(id: number): Observable<OfferType> {
        return this.httpClient.get<OfferType>("https://localhost:6587/api/OfferType/" + id);
    }

    postOfferType(category: OfferType): Observable<OfferType> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.post<OfferType>("https://localhost:6587/api/OfferType", category, {headers: headers});
    }

    putOfferType(id:number, category: OfferType): Observable<OfferType> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.put<OfferType>("https://localhost:6587/api/OfferType/" + id, category, {headers: headers});
    }

    deleteOfferType(id: number): Observable<OfferType> {
        return this.httpClient.delete<OfferType>("https://localhost:6587/api/OfferType/" + id);
    }
}