import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSelectorComponent } from './resume-selector.component';

describe('ResumeSelectorComponent', () => {
  let component: ResumeSelectorComponent;
  let fixture: ComponentFixture<ResumeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
