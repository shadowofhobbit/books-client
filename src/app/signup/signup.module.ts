import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupComponent} from './signup.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {PasswordsDifferValidatorDirective} from './passwords-differ.directive';



@NgModule({
  declarations: [SignupComponent, PasswordsDifferValidatorDirective],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SignupModule { }
