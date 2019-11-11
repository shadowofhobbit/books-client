import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
import {Observable} from 'rxjs';
import {SignupService} from './signup.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        RouterTestingModule
      ],
      providers: [{provide: SignupService, useClass: MockSignUpService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockSignUpService {
  signUp(): Observable<object> {
    return new Observable<object>();
  }
}
