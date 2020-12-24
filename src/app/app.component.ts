import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BooksUser';
  authenticated = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authenticated.subscribe(
      auth => this.authenticated = auth
    );
  }


  onLogout() {
    this.authService.logout()
      .subscribe(
        _ => this.authenticated = false
      );
  }
}
