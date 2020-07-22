import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Book, BookInvoice, SearchResult} from './book.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly booksUrl = `${environment.apiBaseUrl}/books`;

  constructor(private http: HttpClient) { }

  create(bookInvoice: BookInvoice): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, bookInvoice);
  }

  get(id: number): Observable<Book> {
    return this.http.get<Book>(`${(this.booksUrl)}/${id}`);
  }

  getAll(page: number, size: number): Observable<SearchResult<Book>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<SearchResult<Book>>(this.booksUrl, {params});
  }

  update(bookInvoice: BookInvoice): Observable<Book> {
    if (bookInvoice.id == null) {
      throw new Error('Empty book id');
    }
    return this.http.put<Book>(`${(this.booksUrl)}/${bookInvoice.id}`, bookInvoice);
  }

}
