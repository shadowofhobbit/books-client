import {Component, OnInit} from '@angular/core';
import {BooksService} from './books.service';
import {Book, SearchResult} from './book';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
  lastResult: SearchResult<Book>;

  constructor(private booksService: BooksService) { }

  private readonly SIZE = 2147483647;

  ngOnInit() {
    this.booksService.getAll(0, this.SIZE).subscribe(
      result => {
        this.lastResult = result;
      }
    );
  }
}
