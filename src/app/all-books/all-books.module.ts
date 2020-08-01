import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {AllBooksComponent} from './all-books.component';
import {BookComponent} from './book/book.component';
import {MatButtonModule} from '@angular/material/button';
import {EditBookComponent} from './edit-book/edit-book.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AllBooksComponent,
    BookComponent,
    EditBookComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class AllBooksModule { }
