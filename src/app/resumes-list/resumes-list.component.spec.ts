import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumesListComponent } from './resumes-list.component';

describe('ResumesListComponent', () => {
  let component: ResumesListComponent;
  let fixture: ComponentFixture<ResumesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
