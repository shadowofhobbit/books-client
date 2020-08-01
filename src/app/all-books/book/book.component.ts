import {Component, OnInit} from '@angular/core';
import {Book} from '../book.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BooksService} from '../books.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Book;
  id: number;
  defaultValue = 'unknown';

  constructor(private route: ActivatedRoute, private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.booksService.get(Number(params.get('id'))))
    ).subscribe(book => {
      this.book = book;
    });
  }

  edit() {
    this.router.navigate([`/books/edit/${this.book.id}`]);
  }
}
