import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReviewComponent} from './review.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [ReviewComponent],
  exports: [
    ReviewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class ReviewModule { }
