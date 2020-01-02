import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(authenticated => {
      if (authenticated) {
        this.navigateToProfile();
      }
    });
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  login() {
    this.authService.login(this.username, this.password, () => this.navigateToProfile(), () => this.error = true);
  }


}
