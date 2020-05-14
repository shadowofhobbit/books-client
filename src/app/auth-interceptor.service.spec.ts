import {TestBed} from '@angular/core/testing';

import {AuthInterceptorService} from './auth-interceptor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.inject(AuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
