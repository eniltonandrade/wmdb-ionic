import { TestBed } from '@angular/core/testing';

import { MovieDetailsService } from './movie-details.service';

describe('MovieDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieDetailsService = TestBed.get(MovieDetailsService);
    expect(service).toBeTruthy();
  });
});
