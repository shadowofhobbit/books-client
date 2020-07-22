import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {AllBooksComponent} from './all-books.component';
import {BookComponent} from './book/book.component';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AllBooksComponent,
    BookComponent
  ],
    imports: [
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class AllBooksModule { }
