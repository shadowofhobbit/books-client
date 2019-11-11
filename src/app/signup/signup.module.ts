import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupComponent} from './signup.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';



@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SignupModule { }
