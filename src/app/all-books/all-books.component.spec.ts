import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBooksComponent } from './all-books.component';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import {RouterTestingModule} from '@angular/router/testing';

describe('AllBooksComponent', () => {
  let component: AllBooksComponent;
  let fixture: ComponentFixture<AllBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBooksComponent ],
      imports: [
        HttpClientTestingModule,
        MatGridListModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
