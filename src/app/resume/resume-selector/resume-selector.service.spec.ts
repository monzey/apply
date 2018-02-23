import { TestBed, inject } from '@angular/core/testing';

import { ResumeSelectorService } from './resume-selector.service';

describe('ResumeSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResumeSelectorService]
    });
  });

  it('should be created', inject([ResumeSelectorService], (service: ResumeSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
