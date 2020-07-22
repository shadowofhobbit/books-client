import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {BookInvoice} from './book.model';

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

  it('create should send POST request', () => {
    const invoice = new BookInvoice('1984');
    service.create(invoice).subscribe();
    const expectedUrl = `${environment.apiBaseUrl}/books`;
    const testRequest = httpMock.expectOne(expectedUrl);
    expect(testRequest.request.method).toBe('POST');
    expect(testRequest.request.body).toBe(invoice);
  });

  it('get should send GET request', () => {
    const id = 1;
    service.get(id).subscribe();
    const expectedUrl = `${environment.apiBaseUrl}/books/${id}`;
    const testRequest = httpMock.expectOne(expectedUrl);
    expect(testRequest.request.method).toBe('GET');
  });

  it('getAll should send GET request', () => {
    const page = 0;
    const size = 20;
    service.getAll(page, size).subscribe();
    const expectedUrl = `${environment.apiBaseUrl}/books?page=${page}&size=${size}`;
    const testRequest = httpMock.expectOne(expectedUrl);
    expect(testRequest.request.method).toBe('GET');
  });

  it('update should send PUT request', () => {
    const invoice = {title: '1984', id: 1};
    service.update(invoice).subscribe();
    const expectedUrl = `${environment.apiBaseUrl}/books/${invoice.id}`;
    const testRequest = httpMock.expectOne(expectedUrl);
    expect(testRequest.request.method).toBe('PUT');
    expect(testRequest.request.body).toBe(invoice);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
