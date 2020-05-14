import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../environments/environment';
import {AuthResponse} from './auth-response';
import anything = jasmine.anything;

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storage;
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
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    spyOnAllFunctions(callbacks);
    storage = Object.getPrototypeOf(localStorage);
  });

  describe('login', () => {
    it('should call done() and save token', () => {
      spyOn(storage, 'setItem');
      const testToken: AuthResponse = {token: 'header.payload.sig'};
      service.login('user', 'password', callbacks.done, callbacks.error);
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/authenticate`);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush(testToken);
      expect(callbacks.done).toHaveBeenCalled();
      expect(callbacks.error).not.toHaveBeenCalled();
      expect(storage.setItem).toHaveBeenCalledWith(anything(), testToken.token);
    });

    it('should call error()', () => {
      spyOn(storage, 'setItem');
      service.login('user', 'password', callbacks.done, callbacks.error);
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/authenticate`);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush('', { status: 401, statusText: 'Unauthorized' });
      expect(callbacks.done).not.toHaveBeenCalled();
      expect(callbacks.error).toHaveBeenCalled();
      expect(storage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('isAuthenticated', () => {
    it('should send GET request', () => {
      service.isAuthenticated().subscribe(_ => {});
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/authenticated`);
      expect(testRequest.request.method).toBe('GET');
    });
  });

  describe('logout', () => {
    it('should delete token', () => {
      spyOn(storage, 'removeItem');
      service.logout();
      expect(storage.removeItem).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
