import { TestBed } from '@angular/core/testing';

import { CommitsStorageService } from './commits-storage.service';

describe('CommitsStorageService', () => {
  let service: CommitsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
