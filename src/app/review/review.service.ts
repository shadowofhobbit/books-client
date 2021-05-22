import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SearchResult} from '../all-books/book.model';
import {Observable} from 'rxjs';
import {Review} from './review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly booksUrl = `${environment.apiBaseUrl}/books`;

  constructor(private http: HttpClient) { }

  create(review: Review): Observable<Review> {
    return this.http.post<Review>(`${(this.booksUrl)}/${review.bookId}/reviews`, review);
  }

  get(bookId: number, id: number): Observable<Review> {
    return this.http.get<Review>(`${(this.booksUrl)}/${bookId}/reviews/${id}`);
  }

  getAll(bookId: number, page: number, size: number): Observable<SearchResult<Review>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<SearchResult<Review>>(`${(this.booksUrl)}/${bookId}/reviews`, {params});
  }

  update(review: Review): Observable<Review> {
    if (review.id == null) {
      throw new Error('Empty review id');
    }
    return this.http.put<Review>(`${(this.booksUrl)}/${review.bookId}/reviews/${review.id}`, review);
  }

}
