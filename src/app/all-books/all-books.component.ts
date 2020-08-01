import {Component, OnInit} from '@angular/core';
import {BooksService} from './books.service';
import {Book, SearchResult} from './book.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
  lastResult: SearchResult<Book>;

  constructor(private booksService: BooksService, private router: Router) { }

  private readonly SIZE = 2147483647;

  ngOnInit() {
    this.booksService.getAll(0, this.SIZE).subscribe(
      result => {
        this.lastResult = result;
      }
    );
  }

  view(id: number) {
    this.router.navigate([`/books/${id}`]).catch(reason => console.error(reason));
  }

  create() {
    this.router.navigate([`/books/edit`]).catch(reason => console.error(reason));
  }
}
