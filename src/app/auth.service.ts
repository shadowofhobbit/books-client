import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthResponse} from './auth-response';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  private token: string;

  readonly LOGIN_URL = '/auth/login';

  readonly REFRESH_TOKEN_URL = `/auth/refresh`;
  authenticated: Subject<boolean> = new Subject<boolean>();

  readonly allowedUrls = new Set(...this.LOGIN_URL, this.REFRESH_TOKEN_URL,
    'books');

  saveToken(value: AuthResponse) {
    this.token = value.accessToken;
  }

  login(username: string, password: string, done, error) {
    this.http
      .post<AuthResponse>(environment.apiBaseUrl + this.LOGIN_URL, {username, password})
      .subscribe(value => {
        this.saveToken(value);
        done();
        this.authenticated.next(true);
      }, _ => {
        this.authenticated.next(false);
        error();
      });
  }

  isAuthenticated(): Observable<boolean> {
    const url = environment.apiBaseUrl + '/auth/authenticated';
    return this.http.get<boolean>(url).pipe(catchError(_ => of(false)),
      tap(x => this.authenticated.next(x)));
  }

  refreshAccessToken(): Observable<string> {
    const url = `${environment.apiBaseUrl}${this.REFRESH_TOKEN_URL}`;
    return this.http.post<AuthResponse>(url, {})
      .pipe(map(value => {
        this.saveToken(value);
        this.authenticated.next(true);
        return value.accessToken;
      }), catchError(x => of('')));
  }

  logout() {
    const url = `${environment.apiBaseUrl}/auth/logout`;
    this.token = null;
    return this.http.delete<void>(url).pipe(tap(x => this.authenticated.next(false)));
  }

  getAccessToken(): Observable<string> {
    if (this.token != null) {
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      const exp = payload.exp;
      if (Date.now() < exp) {
        this.authenticated.next(true);
        return of(this.token);
      } else {
        return this.refreshAccessToken();
      }
    } else {
      return this.refreshAccessToken();
    }

  }
}
