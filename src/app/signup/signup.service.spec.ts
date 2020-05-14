import { TestBed } from '@angular/core/testing';
import { SignupService } from './signup.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {SignupInvoice} from './signup-invoice.model';
import {AuthResponse} from '../auth-response';
import anything = jasmine.anything;

describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;
  let storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController);
    storage = Object.getPrototypeOf(localStorage);
  });

  describe('signUp', () => {
    it('should send POST request and save token', () => {
      spyOn(storage, 'setItem');
      const testToken: AuthResponse = {token: 'header.payload.sig'};
      const invoice = new SignupInvoice('example', 'example@example.com', 'password');
      service.signUp(invoice).subscribe(_ => {});
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/accounts/register`);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush(testToken);
      expect(storage.setItem).toHaveBeenCalledWith(anything(), testToken.token);
    });

    it('should not save token', () => {
      spyOn(storage, 'setItem');
      const invoice = new SignupInvoice('example', 'example@example.com', 'password');
      service.signUp(invoice).subscribe(_ => {});
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/accounts/register`);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush('', { status: 401, statusText: 'Unauthorized' });
      expect(storage.setItem).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
