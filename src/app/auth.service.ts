import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthResponse} from './auth-response';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly STORAGE_KEY = 'books-user';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string, done, error) {
    this.http
      .post<AuthResponse>(environment.apiBaseUrl + '/authenticate', {username, password})
      .subscribe(value => {
        localStorage.setItem(AuthService.STORAGE_KEY, value.token);
        done();
      }, _ => error());
  }

  isAuthenticated(): Observable<boolean> {
    const url = environment.apiBaseUrl + '/authenticated';
    return this.http.get<boolean>(url).pipe(catchError(_ => of(false)));
  }

  logout() {
    localStorage.removeItem(AuthService.STORAGE_KEY);
  }

  getCurrentToken(): string {
    return localStorage.getItem(AuthService.STORAGE_KEY);
  }
}
