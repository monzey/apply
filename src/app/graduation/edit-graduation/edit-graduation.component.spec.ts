import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGraduationComponent } from './edit-graduation.component';

describe('EditGraduationComponent', () => {
  let component: EditGraduationComponent;
  let fixture: ComponentFixture<EditGraduationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGraduationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGraduationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
