import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupComponent} from './signup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
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
