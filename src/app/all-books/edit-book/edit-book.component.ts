import {Component, OnInit} from '@angular/core';
import {filter, switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BooksService} from '../books.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId;
  bookForm = this.formBuilder.group({
    title: '',
    author: '',
    language: '',
    year: null,
    description: ''
  });

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private booksService: BooksService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      filter(params => params.get('id') != null),
      switchMap((params: ParamMap) => this.booksService.get(Number(params.get('id')))
      )).subscribe(book => {
      this.bookId = book.id;
      this.bookForm.patchValue(book);
    });
  }

  save() {
    if (this.bookId != null) {
      this.booksService
        .update({id: this.bookId, ...this.bookForm.value})
        .subscribe(() => this.displaySnackBar('Book saved'),
          () => this.displaySnackBar('Error saving book'));
    } else {
      this.booksService
        .create(this.bookForm.value)
        .subscribe(value => {
            this.bookId = value.id;
            this.displaySnackBar('Book created');
          },
          () => this.displaySnackBar('Error creating book'));
    }
  }

  private displaySnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000
    });
  }
}
