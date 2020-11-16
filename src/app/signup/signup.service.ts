import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SignupInvoice} from './signup-invoice.model';
import {AuthResponse} from '../auth-response';
import {tap} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  signUp(signUpInvoice: SignupInvoice) {
    const url = `${environment.apiBaseUrl}/accounts/register`;
    return this.http.post<AuthResponse>(url, signUpInvoice).pipe(tap(response => {this.authService.saveToken(response); }));
  }
}
