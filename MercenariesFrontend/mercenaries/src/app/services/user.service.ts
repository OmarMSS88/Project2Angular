import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserDto } from '../dto/update-user.dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.api_url}/user`;

  constructor(private httpClient: HttpClient) {}

  getUserProfile(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: string, updates: UserDto): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${userId}`, updates); // Changed PATCH to PUT
  }
}
