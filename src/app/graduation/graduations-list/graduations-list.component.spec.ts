import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduationsListComponent } from './graduations-list.component';

describe('GraduationsListComponent', () => {
  let component: GraduationsListComponent;
  let fixture: ComponentFixture<GraduationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
