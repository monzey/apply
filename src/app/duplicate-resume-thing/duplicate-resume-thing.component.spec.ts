import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateResumeThingComponent } from './duplicate-resume-thing.component';

describe('DuplicateResumeThingComponent', () => {
  let component: DuplicateResumeThingComponent;
  let fixture: ComponentFixture<DuplicateResumeThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateResumeThingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateResumeThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
