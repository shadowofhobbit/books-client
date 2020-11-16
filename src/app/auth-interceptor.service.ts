import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {flatMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(this.authService.LOGIN_URL) && !req.url.includes(this.authService.REFRESH_TOKEN_URL)) {
      return this.authService.getAccessToken()
        .pipe(
          flatMap((value) => {
            const request = req.clone({
              withCredentials: true,
              setHeaders: {
                Authorization: `Bearer ${value}`
              }
            });
            return this.handleUnauthorized(next, request);
          })
        );
    } else {
      const request = req.clone({
        withCredentials: true,
      });
      return this.handleUnauthorized(next, request);
    }
  }

  private handleUnauthorized(next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request).pipe(
      tap(_ => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['/login']);
          }
        })
    );
  }
}
