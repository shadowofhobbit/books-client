import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth.guard';
import {SignupComponent} from './signup/signup.component';
import {AllBooksComponent} from './all-books/all-books.component';
import {BookComponent} from './all-books/book/book.component';
import {EditBookComponent} from './all-books/edit-book/edit-book.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';

const appRoutes: Routes = [
  {path: '', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: 'books', component: AllBooksComponent},
  {path: 'books/edit', component: EditBookComponent, canActivate: [AuthGuard]},
  {path: 'books/edit/:id', component: EditBookComponent, canActivate: [AuthGuard]},
  {path: 'books/:id', component: BookComponent},
  {path: '**', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
