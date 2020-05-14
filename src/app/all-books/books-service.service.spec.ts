import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should send GET request', () => {
    const page = 0;
    const size = 20;
    service.getAll(page, size).subscribe();
    const expectedUrl = `${environment.apiBaseUrl}/books/?page=${page}&size=${size}`;
    const testRequest = httpMock.expectOne(expectedUrl);
    expect(testRequest.request.method).toBe('GET');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
