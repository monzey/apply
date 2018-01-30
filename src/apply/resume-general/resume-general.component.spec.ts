import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeGeneralComponent } from './resume-general.component';

describe('ResumeGeneralComponent', () => {
  let component: ResumeGeneralComponent;
  let fixture: ComponentFixture<ResumeGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
