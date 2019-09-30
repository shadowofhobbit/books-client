import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthResponse} from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly STORAGE_KEY = 'books-user';

  constructor(private http: HttpClient) { }

  login(username, password, done, error) {
    this.http.post<AuthResponse>(environment.apiBaseUrl + '/authenticate', {username, password})
      .subscribe(value => {
        localStorage.setItem(AuthService.STORAGE_KEY, value.token);
        done();
      }, _ => error());
  }
}
