import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = `${environment.apiBaseUrl}/accounts/current`;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url, user);
  }
}
