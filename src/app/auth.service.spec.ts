import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../environments/environment';
import {AuthResponse} from './auth-response';
import anything = jasmine.anything;

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const callbacks = {
    done() {
      console.log('Done Called');
    },
    error() {
      console.log('Error Called');
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    spyOnAllFunctions(callbacks);
    spyOn(localStorage, 'setItem');
  });

  describe('#login', () => {
    it('should call done() and save token', () => {
      const testToken: AuthResponse = {token: 'header.payload.sig'};
      service.login('user', 'password', callbacks.done, callbacks.error);
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/authenticate`);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush(testToken);
      expect(callbacks.done).toHaveBeenCalled();
      expect(callbacks.error).not.toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(anything(), testToken.token);
    });

    it('should call error()', () => {
      service.login('user', 'password', callbacks.done, callbacks.error);
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/authenticate`);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush('', { status: 401, statusText: 'Unauthorized' });
      expect(callbacks.done).not.toHaveBeenCalled();
      expect(callbacks.error).toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
