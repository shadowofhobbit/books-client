import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User;
  userForm = this.formBuilder.group({
    birthday: null,
    description: ''
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(value => {
      this.user = value;
      this.userForm.patchValue(value);
    });
  }

  update() {
    const updated = {
      ...this.user,
      ...this.userForm.value
    };
    if (updated.birthday.format) {
      updated.birthday = this.userForm.value.birthday.format('YYYY-MM-DD');
    }
    this.userService.updateUser(updated)
      .subscribe(_ => {
          this.displaySnackBar('Saved data');
        },
        () => this.displaySnackBar('Error saving data'));
  }

  private displaySnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000
    });
  }
}
