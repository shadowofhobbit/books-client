import {TestBed} from '@angular/core/testing';
import {SignupService} from './signup.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {SignupInvoice} from './signup-invoice.model';
import {AuthResponse} from '../auth-response';
import {AuthService} from '../auth.service';
import createSpyObj = jasmine.createSpyObj;

describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;


  beforeEach(() => {
    const spy = createSpyObj('AuthService', ['saveToken']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SignupService,
        {provide: AuthService, useValue: spy}
      ]
    });
    service = TestBed.inject(SignupService);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('signUp', () => {
    it('should send POST request and save token', () => {
      const testToken: AuthResponse = {accessToken: 'header.payload.sig'};
      const invoice = new SignupInvoice('example', 'example@example.com', 'password');
      service.signUp(invoice).subscribe(_ => {
      });
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/accounts/register`);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush(testToken);
      expect(authServiceSpy.saveToken).toHaveBeenCalledWith(testToken);
    });

    it('should not save token', () => {
      const invoice = new SignupInvoice('example', 'example@example.com', 'password');
      service.signUp(invoice).subscribe(_ => {
      });
      const testRequest = httpMock.expectOne(`${environment.apiBaseUrl}/accounts/register`);
      expect(testRequest.request.method).toBe('POST');
      testRequest.flush('', {status: 401, statusText: 'Unauthorized'});
      expect(authServiceSpy.saveToken).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
