import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Book, SearchResult} from './book';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<SearchResult<Book>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<SearchResult<Book>>(
      environment.apiBaseUrl + '/books/', {params});
  }

}
