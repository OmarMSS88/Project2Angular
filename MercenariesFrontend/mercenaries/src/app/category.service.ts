import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private httpClient: HttpClient) { }

    getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>("https://localhost:6587/api/OfferType");
    }

    getCategoryById(id: number): Observable<Category> {
        return this.httpClient.get<Category>("https://localhost:6587/api/OfferType/" + id);
    }

    postCategory(category: Category): Observable<Category> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.post<Category>("https://localhost:6587/api/OfferType", category, {headers: headers});
    }

    putCategory(id:number, category: Category): Observable<Category> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.put<Category>("https://localhost:6587/api/OfferType/" + id, category, {headers: headers});
    }

    deleteCategory(id: number): Observable<Category> {
        return this.httpClient.delete<Category>("https://localhost:6587/api/OfferType/" + id);
    }
}