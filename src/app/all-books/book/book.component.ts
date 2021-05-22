import {Component, OnInit} from '@angular/core';
import {Book} from '../book.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BooksService} from '../books.service';
import {switchMap} from 'rxjs/operators';
import {Review} from '../../review/review.model';
import {ReviewService} from '../../review/review.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Book;
  id: number;
  defaultValue = 'unknown';
  reviews: Review[] = [];
  reviewsCount = 0;
  reviewsPageSize = 10;
  page = 0;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private reviewsService: ReviewService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.booksService.get(Number(params.get('id'))))
    ).subscribe(book => {
      this.book = book;
      this.reviewsService.getAll(book.id, this.page, this.reviewsPageSize)
        .subscribe(value => {
          this.reviews = value.content;
          this.reviewsCount = value.totalElements;

        });
    });
  }

  edit() {
    this.router.navigate([`/books/edit/${this.book.id}`]);
  }

  pageChanged(event: PageEvent) {
    this.page = event.pageIndex;
    this.reviewsPageSize = event.pageSize;
    this.reviewsService.getAll(this.book.id, this.page, this.reviewsPageSize)
      .subscribe(value => {
        this.reviews = value.content;
        this.reviewsCount = value.totalElements;

      });
  }
}
