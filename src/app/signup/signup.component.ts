import { Component, OnInit } from '@angular/core';
import {SignupService} from './signup.service';
import {SignupInvoice} from './signup-invoice.model';
import {Router} from '@angular/router';
import {CrossFieldErrorMatcher} from '../CrossFieldErrorMatcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  error: boolean;
  password2: string;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    this.signupService.signUp(new SignupInvoice(this.username, this.email, this.password))
      .subscribe(value => {this.router.navigate(['/profile']); }, error => {this.error = true; });
  }

}
