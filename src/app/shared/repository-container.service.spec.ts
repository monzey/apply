import { TestBed, inject } from '@angular/core/testing';

import { RepositoryFactoryService } from './repository-factory.service';

describe('RepositoryFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoryContainerService]
    });
  });

  it('should be created', inject([RepositoryContainerService], (service: RepositoryContainerService) => {
    expect(service).toBeTruthy();
  }));
});
