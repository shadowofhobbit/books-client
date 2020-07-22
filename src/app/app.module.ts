import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ProfileModule} from './profile/profile.module';
import {AuthInterceptorService} from './auth-interceptor.service';
import {LoginModule} from './login/login.module';
import {SignupModule} from './signup/signup.module';
import {AllBooksModule} from './all-books/all-books.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    AppRoutingModule,
    ProfileModule,
    SignupModule,
    AllBooksModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
