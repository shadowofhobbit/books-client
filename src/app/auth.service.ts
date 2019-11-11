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

  constructor(private http: HttpClient) {
  }
  private static readonly STORAGE_KEY = 'books-user';

  static saveToken(value: AuthResponse) {
    localStorage.setItem(AuthService.STORAGE_KEY, value.token);
  }

  login(username: string, password: string, done, error) {
    this.http
      .post<AuthResponse>(environment.apiBaseUrl + '/authenticate', {username, password})
      .subscribe(value => {
        AuthService.saveToken(value);
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
